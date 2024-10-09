const mongoose = require("mongoose")

const haveQuestionSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const HaveQuestion = mongoose.model("HaveQuestion", haveQuestionSchema)
module.exports = HaveQuestion