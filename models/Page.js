const mongoose = require("mongoose")

const pageSchema = new mongoose.Schema({
    termsAndConditions: {
        type: String,
    },
    privacyPolicy: {
        type: String,
    },
    aboutUs: {
        type: String,
    },
}, { timestamps: true })

const Page = mongoose.model("Page", pageSchema)

module.exports = Page