
const express = require("express")
const ChatController = require("../controllers/chatController")
const authMiddleware = require("../middlewares/authMiddleware")

class ChatRoute {
    constructor() {
        this.router = new express.Router()
        this.chatController = new ChatController()

        this.router.post("/start-chat", authMiddleware, this.chatController.startChat.bind(this))
        this.router.get("/get-messages", authMiddleware, this.chatController.getMessages.bind(this))    
    }
}

module.exports = ChatRoute
