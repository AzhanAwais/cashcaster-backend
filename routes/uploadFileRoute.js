
const express = require("express")
const UploadFileController = require("../controllers/uploadFileController")
const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware")

class UploadFileRoute {
    constructor() {
        this.router = new express.Router()
        this.uploadFileController = new UploadFileController()

        this.router.post("/upload-file", uploadFileMiddleware.single("file"), this.uploadFileController.uploadFile.bind(this))
    }
}

module.exports = UploadFileRoute
