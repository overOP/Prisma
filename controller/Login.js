const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../config/prisma');

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials", 
                success: false
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({
            message: "Login successful",
            success: true,
            accessToken: accessToken,
            user: user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

module.exports = Login