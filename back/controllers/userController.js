const db = require('../mysql/db')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors');
const userRepository = require('../repositories/UserRepository');
const userService = require('../services/UserService')({
    userRepository,
});
const jwtGenerate = require('../utils/jwtGenerator')

const registerUser = asyncHandler(async (req, res) => {
    // destructure incoming user data
    const { firstName, lastName, email, password } = req.body
    // check if email is taken
    const newUser = await userService.isUserEmailAvailableForRegistration(email);
    // preprare user data to insert to db
    const userData = {
        email,
        firstName,
        lastName,
        password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : ''
    }
    // insert user and retrieve user_id
    const { insertId } = await userRepository.insertNewUser(userData)
    // respond json with user data to store in local storage / go straight to dashboard
    res.json({
        email,
        firstName,
        lastName,
        token: jwtGenerate({ email, user_id: insertId }),
        login: true
    })
})

const loginUser = asyncHandler(async (req, res) => {
    // get user by email from db
    const { email } = req.body
    const userDetails = await userService.getUserDetailsByEmail(email)

    if (!userDetails) {
        throw createError(401, 'Email or password incorrect.');
    }
    // deconstruct password and compare to hashed one
    const { password, firstName, lastName, user_id } = userDetails[0];
    const passwordMatch = await bcrypt.compare(req.body.password, password);
    if (!passwordMatch) {
        throw createError(401, 'Email or password incorrect.');
    }
    // respond with jwt and user details/ login
    res.json({
        email,
        firstName,
        lastName,
        token: jwtGenerate({ email, user_id }),
        login: true
    })
})

const getUsers = asyncHandler(async (req, res) => {

    const allUsersDetails = await userService.getAllUsers()

    if (!allUsersDetails) {
        createError(401, 'Something went wrong, please contact administrator.')
    }

    const filteredUsersDetails = allUsersDetails.map(user => {
        const filteredUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin
        }
        return filteredUser
    })
    res.json(filteredUsersDetails)

})

module.exports = { registerUser, getUsers, loginUser }