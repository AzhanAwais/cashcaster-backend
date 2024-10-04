const express = require("express")
const AuthController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

class AuthRoute {
    constructor() {
        this.router = new express.Router()
        this.authController = new AuthController()

        this.router.post("/register", this.authController.register.bind(this))
        this.router.post("/login", this.authController.login.bind(this))
        this.router.post("/logout", authMiddleware, this.authController.logout.bind(this))
        this.router.get("/my-profile", authMiddleware, this.authController.myProfile.bind(this))
        this.router.put("/edit-profile", authMiddleware, this.authController.editProfile.bind(this))
        this.router.put("/change-password", authMiddleware, this.authController.changePassword.bind(this))
        this.router.post("/forgot-password", this.authController.forgotPassword.bind(this))
        this.router.post("/verify-otp", this.authController.verifyOtp.bind(this))
        this.router.post("/resend-otp", this.authController.resendOtp.bind(this))
        this.router.post("/reset-password", authMiddleware, this.authController.resetPassword.bind(this))

    }
}

module.exports = AuthRoute