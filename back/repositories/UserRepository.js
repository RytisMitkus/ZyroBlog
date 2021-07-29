const db = require('../mysql/db')

async function insertNewUser(user) {
  return (await db.query('INSERT INTO users SET ?', [user]))
}

async function checkEmailExists(email) {
  const [user] = await db.query(
    'SELECT 1 FROM users WHERE email=? LIMIT 1',
    email,
  )
  return user
}

async function getUserByEmail(email) {
  return (await db.query('SELECT * FROM users WHERE email=?', [email]))
}

async function getAllUsersDetails() {
  return (await db.query('SELECT * FROM users'))
}
async function updateUser(user) {
  return (await db.query('UPDATE users SET ? WHERE id=?', [user, user.id]))
}

module.exports = {
  insertNewUser, checkEmailExists, getUserByEmail, getAllUsersDetails,
}
