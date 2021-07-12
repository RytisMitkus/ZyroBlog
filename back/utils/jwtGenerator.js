const jwt = require('jsonwebtoken')

const jwtGenerator = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = jwtGenerator