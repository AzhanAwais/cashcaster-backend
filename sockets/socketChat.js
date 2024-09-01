const moment = require("moment")
const Message = require("../models/Message")
const SocketConnection = require("../sockets/socketConnection")

class SocketChat extends SocketConnection {
    constructor(server) {
        super(server)
        this.initSocketEvents()
    }

    initSocketEvents() {
        const chatIo = this.io.of("/chat")

        chatIo.on("connection", async (socket) => {

            socket.on("joinRoom", async (data, ackCallback) => {
                const { chatId } = data
                let roomId = chatId.toString()
                socket.join(roomId)
                ackCallback({ roomId: roomId, event: "joinRoom" })
            })

            socket.on("message", async (data, ackCallback) => {
                const { chatId } = data
                const roomId = chatId
                await Message.create(data)

                const message = {
                    ...data,
                    createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                }
                chatIo.to(roomId).emit('message', message)
                ackCallback({ message: message, event: "message" })
            })
        })
    }
}

module.exports = SocketChat