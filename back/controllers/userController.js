/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const userRepository = require('../repositories/UserRepository')
const userService = require('../services/UserService')({
  userRepository,
})
const jwtGenerate = require('../utils/jwtGenerator')

// @desc    Register and send token
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body

  await userService.isUserEmailAvailableForRegistration(email)
  const userData = {
    email,
    firstName,
    lastName,
    password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : '',
  }
  const { insertId } = await userRepository.insertNewUser(userData)
  res.json({
    id: insertId,
    firstName,
    lastName,
    email,
    token: jwtGenerate({ email, id: insertId }),
    isAuth: true,
  })
})

// @desc    Auth user and send token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  const userDetails = await userService.getUserDetailsByEmail(email)

  if (!userDetails) {
    throw createError(401, 'Email or password incorrect.')
  }
  const {
    password, firstName, lastName, id,
  } = userDetails[0]
  const passwordMatch = await bcrypt.compare(req.body.password, password)
  if (!passwordMatch) {
    throw createError(401, 'Email or password incorrect.')
  }
  const user = {
    email,
    firstName,
    lastName,
    token: jwtGenerate({ email, id }),
    isAuth: true,
  }
  res.json(
    user,
  )
})

// @desc    Auth user & get token
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const allUsersDetails = await userService.getAllUsers()

  if (!allUsersDetails) {
    createError(401, 'Something went wrong, please contact administrator.')
  }
  const filteredUsersDetails = allUsersDetails.map((user) => {
    const filteredUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    }
    return filteredUser
  })
  res.json(filteredUsersDetails)
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // create get user profil response
  res.json({ hey: true })
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    id, firstName, lastName, email,
  } = req.user
  const userData = {
    firstName,
    lastName,
    email,
  }
  await userRepository.updateUser(id, userData)
  res.json(req.user)
})

module.exports = {
  registerUser, getUsers, loginUser, getUserProfile, updateUserProfile,
}
