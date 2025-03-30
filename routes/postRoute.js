const express = require('express')
const router = express.Router()

//post routes
const { postcreate, postget, postgetById, postupdate, postpatch, postdelete } = require('../controller/postcontroller')
router.post('/', postcreate)
router.get('/', postget)
router.get('/:id', postgetById)
router.put('/:id', postupdate)
router.patch('/:id', postpatch)
router.delete('/:id', postdelete)


// Upload image
const { Imagecreate,ImageUploads, ImageUpload, ImageDelete } = require('../controller/img')
const upload = require('../Middleware/Upload')
const authCheck = require('../Middleware/authCheck')
//single image upload
//array of images upload
router.post('/create',authCheck, upload.single('imageUrl'), Imagecreate)
router.post('/uploads',authCheck, upload.array('imageUrl', 5), ImageUploads)
router.post('/upload',authCheck, upload.single('imageUrl'), ImageUpload)
router.delete('/image/:id',authCheck, ImageDelete)


//ac
const postac = require('../controller/ac')
router.post('/ac',authCheck, upload.single('imageUrl'), postac)

module.exports = router