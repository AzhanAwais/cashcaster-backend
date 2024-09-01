const BaseController = require("./baseController")
const User = require("../models/User")
const AuthService = require("../services/authService")
const { userRegisterSchema } = require("../schemas/authSchema")
const { userLoginSchema } = require("../schemas/authSchema")
const CustomError = require("../services/customError")
const bcrypt = require("bcryptjs")
const JwtService = require("../services/jwtService")

class AuthController extends BaseController {
    static blackListedTokens = []

    constructor() {
        super(User)
    }

    async register(req, res, next) {
        try {
            const { error } = userRegisterSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const user = await AuthService.createUser(req.body)
           
            res.status(200).send({
                message: "User registerd successfully",
                data: user,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password, deviceType, deviceToken } = req.body
            const { error } = userLoginSchema.validate(req.body)
            if (error) {
                return next(error)
            }
            const user = await AuthService.findUserByEmail(email)
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return next(new CustomError(400, "Invalid login credentials"))
            }
            // if (user.otp.code && user.otp.type == emailTypes.register) {
            //     return next(new CustomError(400, "Please verify your otp to login"))
            // }
            if (user.isDeleted) {
                return next(new CustomError(200, "Account is deleted"))
            }

            const token = JwtService.generateToken(user)
            user.isOnline = true
            user.deviceType = deviceType
            user.deviceToken = deviceToken
            await user.save()

            res.status(200).send({
                message: "User login successfully",
                data: {
                    user,
                    token
                },
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const token = JwtService.getTokenFormHeaders(req.headers)
            const user = await AuthService.findUserByToken(token)
            user.isOnline = false
            await user.save()
            AuthController.blackListedTokens.push(token)

            res.status(200).send({
                message: "User logout successfully",
                data: null,
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = AuthController