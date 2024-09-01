const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    cashOfferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashOffer",
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat