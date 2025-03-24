const express = require('express')
const { postcreate, postget, postgetById, postupdate, postpatch, postdelete } = require('../controller/postcontroller')
const router = express.Router()

router.post('/', postcreate)
router.get('/', postget)
router.get('/:id', postgetById)
router.put('/:id', postupdate)
router.patch('/:id', postpatch)
router.delete('/:id', postdelete)

module.exports = router