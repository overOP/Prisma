const prisma = require("../config/prisma");

//  "../config/prisma"

const postcreate = async (req, res) => {
    try {
        const { title, descrption, userId } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                descrption,
                userId: parseInt(userId)
            }
        });
        return res.status(201).json({
            message: 'Post created successfully',
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
}
const postget = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        return res.status(200).json({
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    }
}

const postgetById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });
        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }
        return res.status(200).json({
            message: 'Post fetched successfully',
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching post',
            error: error.message
        });
    }
}

const postupdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, descrption } = req.body;
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                descrption
            }
        });
        return res.status(200).json({
            message: 'Post updated successfully',
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating post',
            error: error.message
        });
    }
}

const postpatch = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: updateData
        });
        return res.status(200).json({
            message: 'Post patched successfully',
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error patching post',
            error: error.message
        });
    }
}

const postdelete = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        return res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
}



module.exports = { 
    postcreate,
     postget,
      postgetById,
       postupdate,
        postpatch,
         postdelete 
        }