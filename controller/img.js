const prisma = require("../config/prisma");
const fs = require('fs');
const Imagecreate = async (req, res) => {
    try {
        const { title, descrption, userId } = req.body;
        const image = req.file;
        const imageUrl = image.path;
        const post = await prisma.post.create({
            data: { 
                title: title, 
                descrption: descrption, 
                imageUrl: imageUrl, 
                userId: parseInt(userId) 
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
//for array of images
const ImageUploads = async (req, res) => {
    try {
        const { title, descrption, userId } = req.body;
        const images = req.files;
        const imageUrls = images.map(image => image.path);
        const post = await prisma.post.create({
            data: { 
                title: title, 
                descrption: descrption, 
                imageUrl: JSON.stringify(imageUrls), 
                userId: parseInt(userId) ,
             
            }
        });
        return res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error uploading images',
            error: error.message
        });
    }
}
const ImageUpload = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        const images = req.files;
        const imageUrls = images.map(image => image.path);
    } catch (error) {
        return res.status(500).json({
            message: 'Error uploading images',
            error: error.message
        });
    }
}
//delete image
const ImageDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        //delete image from storage
        const imagePath = post.imageUrl;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image from storage:', err);
            }
        });


    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
}
module.exports = { 
    Imagecreate,
    ImageUploads, 
    ImageUpload, 
    ImageDelete 
}