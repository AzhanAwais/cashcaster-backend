const CustomError = require("../services/customError")

const roleMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        if (allowedRoles.includes(req.user.role)) {
            next()
        }
        else {
            return next(new CustomError(401, "You can't access this route"))
        }
    }

}

module.exports = roleMiddleware