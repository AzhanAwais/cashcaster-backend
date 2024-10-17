const mongoose = require("mongoose")
const { offerTypes } = require("../constants/constants")

const postToCashOfferSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    offerType: {
        type: String,
        required: true,
        enum: [offerTypes.product, offerTypes.service],
        default: offerTypes.product,
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
    },
    isPublished:{
        type: Boolean,
        default: false
    },
    approvedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true })

const PostToCashOffer = mongoose.model('PostToCashOffer', postToCashOfferSchema)

module.exports = PostToCashOffer