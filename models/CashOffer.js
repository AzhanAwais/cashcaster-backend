const mongoose = require("mongoose")
const { offerTypes, cashOfferStatus } = require("../constants/constants")

const cashOfferSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: true,
        default: null
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: false,
        default: cashOfferStatus.pending,
        enum: [cashOfferStatus.pending, cashOfferStatus.accepted, cashOfferStatus.rejected]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // location: [
    //     {
    //         country: { type: String, required: true },    // You can add additional constraints like length if needed
    //         state: { type: String, required: true },
    //         regions: { type: [String], required: true }
    //     }
    // ]

}, { timestamps: true })

const CashOffer = mongoose.model('CashOffer', cashOfferSchema)

module.exports = CashOffer