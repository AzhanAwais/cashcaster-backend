const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: null
    },
    body: {
        type: String,
        required: false,
        default: null
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isRead: {
        type: Boolean,
        required: false,
        default: false
    },
    type: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification