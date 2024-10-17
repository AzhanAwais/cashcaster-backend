const joi = require("joi")
const { validations } = require("../constants/constants")

const stateSchema = joi.object({
    name: joi.string().min(validations.stateMin).max(validations.stateMax).required(),
    abbreviation: joi.string().min(validations.abbreviationMin).max(abbreviationMax).required(),
})

module.exports = {
    stateSchema,
}