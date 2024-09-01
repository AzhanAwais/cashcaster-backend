const mongoose = require("mongoose")

const cashOfferClickedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cashOfferId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CashOffer'
    }
}, { timestamps: true })

const CashOfferClicked = mongoose.model('CashOfferClicked', cashOfferClickedSchema)

module.exports = CashOfferClicked