const jwt = require('jsonwebtoken')

const jwtGenerator = ({ email, id }) => jwt.sign({ email, id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
})

module.exports = jwtGenerator
