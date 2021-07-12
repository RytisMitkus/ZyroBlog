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
    const user = req.body
    const { firstName, lastName, email, password, isAdmin } = user
    await userService.isUserEmailAvailableForRegistration(email);


    const userData = {
        isAdmin,
        email,
        firstName,
        lastName,
        password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : ''
    }
    await userRepository.insertNewUser(userData)
    res.json({
        isAdmin,
        email,
        firstName,
        login: true
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body

    const userDetails = await userService.getUserDetailsByEmail(email)

    if (!userDetails) {
        throw createError(401, 'Email or password incorrect.');
    }
    const { password, ...user } = userDetails[0];
    // console.log(req.body.password, password)
    const passwordMatch = await bcrypt.compare(req.body.password, password);
    if (!passwordMatch) {
        throw createError(401, 'Email or password incorrect.');
    }
    // token: jwtGenerate(id)

    res.json({ ...user, token: jwtGenerate(email) })
})

const getUsers = (req, res) => {
    db.query(`SELECT * FROM users;`, (err, result) => {
        if (!err) {
            const usersList = result.map((user) => {
                const filteredUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
                return filteredUser
            })
            res.json(usersList)
        } else {
            res.json({
                error: true,
                msg: `Something went wrong, please contact administrator`
            })
        }
        return result
    })
}



module.exports = { registerUser, getUsers, loginUser }