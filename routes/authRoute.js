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
    }
}

module.exports = AuthRoute