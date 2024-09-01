class CustomError extends Error {
    status; message

    constructor(status, message) {
        super(message)
        this.status = status
        this.message = message
    }
}

module.exports = CustomError