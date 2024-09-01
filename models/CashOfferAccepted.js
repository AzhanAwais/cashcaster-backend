const mongoose = require("mongoose")

const cashOfferAcceptedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cashOfferId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CashOffer",
        required: true
    }
}, { timestamps: true })

const CashOfferAccepted = mongoose.model('CashOfferAccepted', cashOfferAcceptedSchema)

module.exports = CashOfferAccepted