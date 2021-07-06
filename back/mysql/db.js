const util = require('util');
const mysql = require('mysql');
const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
const pool = mysql.createPool(options)
pool.query = util.promisify(pool.query);

module.exports = pool;