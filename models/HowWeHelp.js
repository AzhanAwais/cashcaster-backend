const mongoose = require("mongoose")

const howWeHelpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const HowWeHelp = mongoose.model("HowWeHelp", howWeHelpSchema)
module.exports = HowWeHelp