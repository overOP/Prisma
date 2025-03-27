const prisma = require("../config/prisma");

const postac = async (req, res) => {
    try {
        const file = req.file;
        const { title, descrption } = req.body;
        console.log(req.user);
        const fileUrl = file.path;
        const post = await prisma.post.create({
            data: { 
                title: title, 
                descrption: descrption, 
                imageUrl: fileUrl, 
                userId: parseInt(req.user.id)
            }
        });
        return res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
}
module.exports = postac;