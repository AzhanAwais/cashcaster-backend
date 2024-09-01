const mongoose = require("mongoose")
const Chat = require("../models/Chat")
const CustomError = require("./customError")
const PaginationService = require("./paginationService")
const Message = require("../models/Message")

class ChatService {

    async isChatAlreadyExists(participants, cashOfferId) {
        const chat = await Chat.findOne({
            cashOfferId: cashOfferId,
            participants: { $all: participants.map(id => new mongoose.Types.ObjectId(id)) }
        })

        return chat
    }

    async createChat(chat) {
        const newChat = new Chat(chat)
        await newChat.save()
        return newChat
    }

    async isChatExists(chatId) {
        const isExists = await Chat.exists({ _id: chatId })
        if (!isExists) {
            throw new CustomError(400, `Invalid chatId. No chat found`)
        }
        return isExists
    }

    async getAllMessages(query) {
        const projection = {
            '_id': 0,
            'updatedAt': 0,
            '__v': 0
        }

        const paginationService = new PaginationService(Message)
        const { data, pagination } = await paginationService.addPagination(query, [], projection)

        return { data, pagination }
    }
}

module.exports = new ChatService()