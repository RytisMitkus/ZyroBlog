const express = require('express')
const router = express.Router()
const { registerUser, getUsers, loginUser } = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')


router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

router.route('/login')
    .get(loginUser)


module.exports = router;


