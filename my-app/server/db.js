const mysql = require('mysql2');
const dbConfig = require('./config/db.config.js');

const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection.promise();