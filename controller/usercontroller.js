const prisma = require('../config/prisma');
   const usercreate = async (req, res) => {
       try {
        
        const { name, email, password, phone, address } = req.body;
        const user = await prisma.user.create({
            data: { 
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: address
             }
        });
        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
        return res.status(201).json({
            message: 'User created successfully',
            data: userData
        })
       } catch (error) {
        return res.status(201).json({
            message: 'User not created',
            data: error.message
        })
       }
    }
 
    const userget = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
            return res.status(200).json({
                message: 'Users fetched successfully',
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching users',
                error: error.message
            });
        }
    }

    const usergetById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) }
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json({
                message: 'User fetched successfully',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error fetching user',
                error: error.message
            });
        }
    }

    const userupdate = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, phone, address } = req.body;
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    email,
                    phone,
                    address
                }
            });
            return res.status(200).json({
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating user',
                error: error.message
            });
        }
    }

    const userpatch = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const user = await prisma.user.update({
                where: { id: parseInt(id) },
                data: updateData
            });
            return res.status(200).json({
                message: 'User patched successfully',
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error patching user',
                error: error.message
            });
        }
    }

    const userdelete = async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.user.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({
                message: 'User deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting user',
                error: error.message
            });
        }
    }

    module.exports = {
        usercreate,
        userget,
        usergetById,
        userupdate,
        userpatch,
        userdelete
    }

    //to create and save resource to database
    //prisma.user.create({})
    
    //to update resource to database
    //prisma.user.update({
    //    where: { id: 1 },
    //    data: { name: 'John Doe' }
    //    })
    
    //to delete resource from database
    //prisma.user.delete({
    //    where: { id: 1 }
    //    })
    
    //to read resource from database
    //prisma.user.findMany({})
    
    //to read single resource from database
    //prisma.user.findUnique({
    //    where: { id: 1 }
    //    })
    
    //to read single resource from database
    //prisma.user.findUnique({
    //    where: { id: 1 }
    //    })
