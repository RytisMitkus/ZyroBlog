const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userRepository = require('../repositories/UserRepository')
const userService = require('../services/UserService')({ userRepository })
const createError = require('http-errors');


const protect = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await userService.getUserDetailsByEmail(decoded.email)

            req.user = user[0]

            next()
        } catch (error) {
            throw createError(401, 'Not authorized, token failed.');
        }
    }
    if (!token) {
        throw createError(401, 'Not authorized, no token.');
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin === 1) {
        next()
    } else {
        throw createError(401, 'Not authorized as an admin.');
    }
}

module.exports = { protect, admin }