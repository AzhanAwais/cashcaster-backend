const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    image: {
        type: String,
        required: true,
        default: null
    },
    parentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports = SubCategory