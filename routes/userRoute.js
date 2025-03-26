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

