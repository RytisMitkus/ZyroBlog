const util = require('util');
const mysql = require('mysql');
const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
function setupMysqlPool(options) {
    const pool = mysql.createPool(options);

    // Check connection to MySql
    pool.getConnection((err, connection) => {
        if (err) {
            const errorMsg = E_ERROR_CODES[err.code] || 'DB pool error';
            logger.log(errorMsg, err);
            // eslint-disable-next-line no-console
            console.error(errorMsg, err);
        }
        if (connection) {
            connection.release();
        }
    });

    pool.query = util.promisify(pool.query);

    return pool;
}

const pool = setupMysqlPool(options);

module.exports = pool;