const { startChatSchema } = require("../schemas/chatSchema")
const chatService = require("../services/chatService")

class ChatController {

    async startChat(req, res, next) {
        try {
            const { participants, cashOfferId } = req.body

            const { error } = startChatSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const chat = await chatService.isChatAlreadyExists(participants, cashOfferId)

            if (!chat) {
                const newChat = await chatService.createChat(req.body)
                res.status(201).json({
                    message: "Chat created successfully",
                    data: newChat
                })
            }

            res.status(200).json({
                message: "Chat fetch successfully",
                data: chat
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async getMessages(req, res, next) {
        try {
            const query = req.query
            const { data, pagination } = await chatService.getAllMessages(query)

            res.status(200).send({
                message: "Chat fetched successfully",
                data,
                pagination
            })
        }
        catch (e) {
            return next(e)
        }
    }
}

module.exports = ChatController