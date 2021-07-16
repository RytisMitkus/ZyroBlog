const jwt = require('jsonwebtoken')

const jwtGenerator = ({ email, user_id }) => {
    return jwt.sign({ email, user_id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = jwtGenerator