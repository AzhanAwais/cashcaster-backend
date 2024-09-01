
const express = require("express")
const NotificationController = require("../controllers/notificationController")
const authMiddleware = require("../middlewares/authMiddleware")

class NotificationRoute {
    constructor() {
        this.router = new express.Router()
        this.notificationController = new NotificationController()


        this.router.post("/create", authMiddleware, this.notificationController.createOne.bind(this))
        this.router.get("/get-all", authMiddleware, this.notificationController.getAll.bind(this))
        this.router.post("/mark-as-read", authMiddleware, this.notificationController.markNotificationRead.bind(this))
    }
}

module.exports = NotificationRoute
