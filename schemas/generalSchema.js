const joi = require("joi")
const { validations } = require("../constants/constants")

const howWeHelpSchema = joi.object({
    name: joi.string().min(validations.nameMin).max(validations.nameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    businessName: joi.string().min(validations.businessNameMin).max(validations.businessNameMax),
    businessType: joi.string().min(validations.businessTypeMin).max(validations.businessTypeMax),
    city: joi.string().max(validations.cityMax).required(),
    state: joi.string().max(validations.stateMax).required(),
    zip: joi.string().min(validations.zipMin).max(validations.zipMax).required(),
    message: joi.string().max(validations.messageMax).required(),
})

const haveQuestionSchema = joi.object({
    name: joi.string().min(validations.nameMin).max(validations.nameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    message: joi.string().max(validations.messageMax).required(),
})

module.exports = {
    howWeHelpSchema,
    haveQuestionSchema,
}