const express = require('express')
const postcreate = require('../controller/postcontroller')
const router = express.Router()

router.get('/', postcreate)

module.exports = router