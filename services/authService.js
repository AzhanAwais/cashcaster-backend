const User = require("../models/User")
const bcrypt = require("bcryptjs")
const CustomError = require("./customError")
const EmailService = require("./emailService")
const OtpService = require("./otpService")
const { emailTypes } = require("../constants/constants")
const JwtService = require("./jwtService")

class AuthService {
    async createUser(user, isSocialLogin = false) {
        const isUserExists = await User.exists({ email: user.email })
        if (isUserExists) {
            throw new CustomError(409, `User already exists with the email ${user.email}`)
        }

        if (!isSocialLogin) {
            if (user.password != user.confirmPassword) {
                throw new CustomError(400, `Password and confirm password must be same`)
            }
            user.password = await bcrypt.hash(user.password, 10)
            // const otp = OtpService.generateOtp()
            // user.otp = {
            //     type: emailTypes.register,
            //     code: otp,
            //     expiresIn: OtpService.getExpiresIn()
            // }
            // await EmailService.sendEmail(user.email, EmailService.getEmailSubject(emailTypes.register), EmailService.getEmailHtml(user, otp, emailTypes.register))
        }

        const userDoc = new User(user)
        const newUser = await userDoc.save()
        return newUser
    }

    async findUserByEmail(email) {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            throw new CustomError(404, `User not found with the email ${email}`)
        }
        return user
    }

    async findUserById(id) {
        const user = await User.findById({ _id: id })
        if (!user) {
            throw new CustomError(404, `User not found. Invalid Id`)
        }
        return user
    }

    async findUserByToken(token = null) {
        const id = JwtService.verifyToken(token)
        const user = await User.findById({ _id: id })
        if (!user) {
            throw new CustomError(404, `User not found. Invalid Id`)
        }
        return user
    }


    async updateProfile(currUserId, body) {
        const { email, ...restBody } = body
        const user = await User.findByIdAndUpdate({ _id: currUserId }, { ...restBody }, { new: true })
        if (!user) {
            throw new CustomError(404, `User not found. Invalid Id`)
        }
        return user
    }

    async updatePassword(currUserId, body) {
        let { password } = body

        password = await bcrypt.hash(password, 10)

        const user = await User.findByIdAndUpdate({ _id: currUserId }, { password }, { new: true })

        if (!user) {
            throw new CustomError(404, `User not found. Invalid Id`)
        }
        return user
    }
}

module.exports = new AuthService()