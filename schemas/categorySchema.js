const joi = require("joi")
const { validations } = require("../constants/constants")

const categorySchema = joi.object({
    name: joi.string().max(validations.categoryMax).required(),
    image: joi.string().required(),
})

const subCategorySchema = joi.object({
    name: joi.string().max(validations.subCategoryMax).required(),
    image: joi.string().required(),
    parentCategoryId: joi.string().required(),
})

module.exports = {
    subCategorySchema,
    categorySchema,
}