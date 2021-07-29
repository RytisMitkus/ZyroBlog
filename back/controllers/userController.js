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
  // destructure incoming user data
  const {
    firstName, lastName, email, password,
  } = req.body

  // check if email is taken
  await userService.isUserEmailAvailableForRegistration(email)
  // preprare user data to insert to db
  const userData = {
    email,
    firstName,
    lastName,
    password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : '',
  }
  // insert user and retrieve user_id
  const { insertId } = await userRepository.insertNewUser(userData)
  // respond json with user data to store in local storage / go straight to dashboard
  res.json({
    email,
    firstName,
    lastName,
    token: jwtGenerate({ email, user_id: insertId }),
    login: true,
  })
})

// @desc    Auth user and send token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // get user by email from db
  const { email } = req.body
  const userDetails = await userService.getUserDetailsByEmail(email)

  if (!userDetails) {
    throw createError(401, 'Email or password incorrect.')
  }
  // deconstruct password and compare to hashed one
  const {
    // eslint-disable-next-line camelcase
    password, firstName, lastName, user_id,
  } = userDetails[0]
  const passwordMatch = await bcrypt.compare(req.body.password, password)
  if (!passwordMatch) {
    throw createError(401, 'Email or password incorrect.')
  }
  // respond with jwt and user details/ login
  const user = {
    email,
    firstName,
    lastName,
    token: jwtGenerate({ email, user_id }),
  }
  res.json(
    user,
  )
})

// @desc    Auth user & get token
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // get all users from db
  const allUsersDetails = await userService.getAllUsers()

  if (!allUsersDetails) {
    createError(401, 'Something went wrong, please contact administrator.')
  }
  // filter password/only relevant info
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
  res.json(req.user)
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    user_id, firstName, lastName, email,
  } = req.user
  const userData = {
    firstName,
    lastName,
    email,
  }
  await userRepository.updateUser(user_id, userData)
  res.json(req.user)
})

module.exports = {
  registerUser, getUsers, loginUser, getUserProfile, updateUserProfile,
}
