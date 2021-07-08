const db = require('../mysql/db')
const asyncHandler = require('express-async-handler')
const userRepository = require('../repositories/UserRepository');
const userService = require('../services/UserService')({
    userRepository,
});

const registerUser = asyncHandler(async (req, res) => {
    const user = req.body
    const { firstName, lastName, email, password, isAdmin } = user

    await userService.isUserEmailAvailableForRegistration(email);

    await userRepository.insertNewUser(user)
    res.json({
        isAdmin,
        email,
        firstName,
        login: true
    })
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

const loginUser = (req, res) => {
    const { email, password } = req.body

    db.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`, (err, result) => {
        if (result.length > 0) {
            res.json(result)
        } else {
            res.json({
                error: true,
                msg: `E-mail of password is incorrect`
            })
        }
        return result
    })
}

module.exports = { registerUser, getUsers, loginUser }