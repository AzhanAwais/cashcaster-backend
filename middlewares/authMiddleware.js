const JwtService = require("../services/jwtService")
const AuthController = require("../controllers/authController")
const CustomError = require("../services/customError")
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization']

        console.log(req.headers['authorization'],'=-----------------------')

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
            return next(new CustomError(401, `Unauthorized or No token provided`))
        }

        const token = authorizationHeader.split(' ')[1]
        const isTokenExpired = AuthController.blackListedTokens.includes(token)


        if (isTokenExpired) {
            return next(new CustomError(401, "Unauthorized token is expired"))
        }

        const id = await JwtService.verifyToken(token)
        const user = await User.findById({ _id: id })
        if (!user) {
            return next(new CustomError(401, "Unauthorized invalid token provided"))
        }

        req.user = user
        next()
    }
    catch (e) {
        return next(e)
    }
}

module.exports = authMiddleware