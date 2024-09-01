const { Server } = require("socket.io")

class SocketConnection {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: "*"
            }
        })
    }
}

module.exports = SocketConnection