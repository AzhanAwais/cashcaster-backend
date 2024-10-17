const mongoose = require("mongoose")

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    abbreviation:{
        type: String,
        required: true,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const State = mongoose.model('State', stateSchema)

module.exports = State