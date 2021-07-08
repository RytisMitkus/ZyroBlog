const createError = require('http-errors');
const userRepository = require('../repositories/UserRepository')

module.exports = ({
    userRepository,
}) => ({
    async isUserEmailAvailableForRegistration(email) {
        const emailExists = await userRepository.checkEmailExists(email);
        if (emailExists) {
            throw createError(409, 'Oops! Email has already been taken.');
        }
    }
})