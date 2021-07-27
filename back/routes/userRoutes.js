const express = require('express')

const router = express.Router()
const {
  registerUser, getUsers, loginUser, getUserProfile,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)

router.route('/login')
  .post(loginUser)

router.route('/profile').get(protect, getUserProfile)

module.exports = router
