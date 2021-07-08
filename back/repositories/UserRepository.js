const db = require('../mysql/db')

async function insertNewUser(user) {
	return (await db.query('INSERT INTO users SET ?', [user]));
}
async function checkEmailExists(email) {
	const [user] = await db.query(
		'SELECT 1 FROM users WHERE email=? LIMIT 1',
		email,
	);
	return user;
}

module.exports = { insertNewUser, checkEmailExists }