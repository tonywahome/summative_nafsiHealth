require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "your_password",
    DB: process.env.DB_NAME || "healthcare_db",
    port: process.env.DB_PORT || 3306
};