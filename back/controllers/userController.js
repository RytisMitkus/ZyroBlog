const pool = require('../mysql/db')

const registerUser = (req, res) => {
    const user = req.body
    const { firstName, lastName, email, password, isAdmin } = user

    pool.getConnection((err, connection) => {

        connection.query(`INSERT INTO users (FirstName, LastName, password, email, isAdmin) VALUES ('${firstName}', '${lastName}', '${password}', '${email}', '${isAdmin}');`, (err, result) => {
            connection.release();

            if (!err) {
                res.json({
                    isAdmin,
                    email,
                    firstName,
                    login: true
                })
            } else {
                console.log(err)
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
                    msg: `Something went wrong, please contact administrator`
                })
            }
            return result
        })
    })
}

const loginUser = (req, res) => {
    pool.getConnection((err, connection) => {
        const { email, password } = req.body
        console.log(email, password)
        connection.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}';`, (err, result) => {
            connection.release();
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
    })

}

module.exports = { registerUser, getUsers, loginUser }