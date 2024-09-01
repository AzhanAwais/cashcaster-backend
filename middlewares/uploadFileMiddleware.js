const multer = require("multer")
const path = require("path")

const uploadPath = path.join(__dirname, "../public/uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        let fileName = Date.now() + "-" + file.originalname
        cb(null, fileName)
    }
})

const uploadFileMiddleware = multer({ storage: storage })

module.exports = uploadFileMiddleware
