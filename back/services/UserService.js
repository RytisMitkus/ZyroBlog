const createError = require('http-errors');

module.exports = ({
    userRepository,
}) => ({
    async isUserEmailAvailableForRegistration(email) {
        const emailExists = await userRepository.checkEmailExists(email);
        if (emailExists) {
            throw createError(409, 'Oops! Email has already been taken.');
        }
    },

    async getUserDetailsByEmail(email) {
        return await userRepository.getUserByEmail(email);
    },

    async getAllUsers() {
        return await userRepository.getAllUsersDetails()
    }

})