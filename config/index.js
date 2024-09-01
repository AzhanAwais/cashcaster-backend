require('dotenv').config()

module.exports = {
    PORT,
    DB_URL,
    JWT_SECRET_KEY,
    APP_URL,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_FROM,
    PUSH_NOTIFICATION_SERVER_KEY,
} = process.env