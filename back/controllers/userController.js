const pool = require('../mysql/db')

const registerUser = (req, res) => {
    const user = req.body
    const { firstName, lastName, email, password, isAdmin } = user

    const registerSql = `INSERT INTO users (FirstName, LastName, password, email, isAdmin) VALUES ('${firstName}', '${lastName}', '${password}', '${email}', '${isAdmin || 0}');`

    pool.getConnection((err, connection) => {

        connection.query(registerSql, (err, result) => {
            connection.release();

            if (!err) {
                console.log(result)
                res.json({
                    isAdmin,
                    email,
                    firstName,
                    login: true
                })
            } else {
                console.log(err)
                console.log(result)
                res.json({
                    error: true,
                    msg: `User with email - ${email} already exists`
                })
            }
            return result
        })
    })
}

const getUsers = (req, res) => {
    pool.getConnection((err, connection) => {

        connection.query(`SELECT * FROM users;`, (err, result) => {
            connection.release();
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
                    msg: `User with email - ${email} already exists`
                })
            }
            return result
        })
    })
}

module.exports = { registerUser, getUsers }