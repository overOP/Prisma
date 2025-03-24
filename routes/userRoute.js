const express = require('express')

const router = express.Router()

//SignUp
const SignUp = require('../controller/SignUp')
router.post('/SignUp', SignUp)

//Login
const Login = require('../controller/Login')
router.post('/Login', Login)

//user
const { usercreate, userget, usergetById, userupdate, userpatch, userdelete } = require('../controller/usercontroller')
router.post('/', usercreate)
router.get('/', userget)
router.get('/:id', usergetById)
router.put('/:id', userupdate)
router.patch('/:id', userpatch)
router.delete('/:id', userdelete)

module.exports = router

//to create and save resource to database
//prisma.user.create({})

//to update resource to database
//prisma.user.update({})

//to delete resource from database
//prisma.user.delete({})

//to get resource from database
//prisma.user.findMany({})

//to get single resource from database
//prisma.user.findUnique({})

