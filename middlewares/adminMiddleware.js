const JwtService = require("../services/jwtService")
const AuthController = require("../controllers/authController")
const CustomError = require("../services/customError")
const User = require("../models/User")
const { roles } = require("../constants/constants")

const adminMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization']
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
            return next(new CustomError(401, `Unauthorized or No token provided`))
        }

        const token = authorizationHeader.split(' ')[2]
        const isTokenExpired = AuthController.blackListedTokens.includes(token)

        if (isTokenExpired) {
            return next(new CustomError(401, "Unauthorized token is expired"))
        }

        const id = await JwtService.verifyToken(token)
        const user = await User.findById({ _id: id })
        if (!user) {
            return next(new CustomError(401, "Unauthorized invalid token provided"))
        }
        if (user.role != roles.admin) {
            return next(new CustomError(401, "Unauthorized Role, only admin have access"))
        }

        req.user = user
        next()
    }
    catch (e) {
        return next(e)
    }
}

module.exports = adminMiddleware