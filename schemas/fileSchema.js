const joi = require("joi")
const { validations } = require("../constants/constants")

const uploadFileSchema = joi.object({
    file: joi.required(),
})

module.exports = {
    uploadFileSchema,
}