const mongoose = require("mongoose")

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Page = mongoose.model("Page", pageSchema)

module.exports = Page