const express = require('express')
const router = express.Router()
const { registerUser, getUsers } = require('../controllers/userController')



router.route('/')
    .post(registerUser)
    .get(getUsers)


module.exports = router;


