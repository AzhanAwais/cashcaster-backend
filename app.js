const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const path = require("path")
const { createServer } = require('http')
const errorMiddleware = require("./middlewares/errorMiddleware")
const { PORT, DB_URL } = require("./config/index")
const AuthRoute = require("./routes/authRoute")
const UserRoute = require("./routes/userRoute")
const UploadFileRoute = require("./routes/uploadFileRoute")
const SocketChat = require("./sockets/socketChat")
const ChatRoute = require("./routes/chatRoute")
const CategoryRoute = require("./routes/categoryRoute")
const SubCategoryRoute = require("./routes/subCategoryRoute")
const CashOfferRoute = require("./routes/cashOfferRoute")
const PostToCashOfferRoute = require("./routes/postToCashOfferRoute")
const NotificationRoute = require("./routes/notificationRoute")
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

class App {
    app; port; db_url; httpServer;

    constructor() {
        this.app = express()
        this.httpServer = createServer(this.app)
        this.port = PORT
        this.db_url = DB_URL

        this.initMiddlewares()
        this.initDb()
        this.initRoutes()
        this.initSockets()
        this.initSwagger()
        this.initErrorMiddleware()
    }

    initMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.json({ extended: false }))
        this.app.use(cors({ origin: "*" }))
        this.app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
    }

    initErrorMiddleware() {
        this.app.use(errorMiddleware)
    }

    initRoutes() {
        this.app.use("/api/auth", new AuthRoute().router)
        this.app.use("/api/category", new CategoryRoute().router)
        this.app.use("/api/sub-category", new SubCategoryRoute().router)
        this.app.use("/api/cash-offer", new CashOfferRoute().router)
        this.app.use("/api/post-to-cash-offer", new PostToCashOfferRoute().router)
        this.app.use("/api/notification", new NotificationRoute().router)

        this.app.use("/api/user", new UserRoute().router)
        this.app.use("/api/file", new UploadFileRoute().router)
        this.app.use("/api/chat", new ChatRoute().router)
    }

    initDb() {
        mongoose.connect(this.db_url).then(() => {
            console.log("Db connected successfully")
        }).catch((e) => {
            console.log("Problem with db connection")
        })
    }

    initSockets() {
        const socketChat = new SocketChat(this.httpServer)
    }

    initSwagger() {
        const swaggerDocument = YAML.load('./swagger1.yaml')
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    initServer() {
        this.httpServer.listen(this.port, () => {
            console.log(`listen port ${this.port}`)
        })
    }

}

module.exports = App