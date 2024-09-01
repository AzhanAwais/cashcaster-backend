const mongoose = require("mongoose")

const postToCashOfferSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cashOfferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashOffer",
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: [String],
        required: false,
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const PostToCashOffer = mongoose.model('PostToCashOffer', postToCashOfferSchema)

module.exports = PostToCashOffer