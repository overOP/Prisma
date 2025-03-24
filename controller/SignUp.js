const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../config/prisma');

const SignUp = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        
        const checkUser = await prisma.user.findUnique({
            where: {email}
        })
        if (checkUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            //end to end encryption
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone,
                address: address
            }
        })
        //generate token
        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, 
        //secret key
        process.env.JWT_SECRET, {expiresIn: '1d'})
        
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            accessToken: accessToken,
            user: user
        })

    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        })
    }
}
module.exports = SignUp