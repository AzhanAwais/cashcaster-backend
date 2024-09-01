const CustomError = require("../services/customError")
const { ValidationError } = require("joi")

const errorMiddleware = (err, req, res, next) => {
    let status = 500
    let data = {
        message: "Internal server error"
    }

    if (err instanceof ValidationError) {
        status = 422
        data = {
            message: err.message.replace(/\\/g, '').replace(/"/g, '')
        }
    }

    if (err instanceof CustomError) {
        status = err.status
        data = {
            message: err.message
        }
    }

    data.stack = err.stack

    return res.status(status).json(data)
}

module.exports = errorMiddleware