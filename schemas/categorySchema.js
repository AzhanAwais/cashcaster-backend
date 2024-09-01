const joi = require("joi")
const { validations } = require("../constants/constants")

const categorySchema = joi.object({
    name: joi.string().max(validations.categoryMax).required(),
})

const subCategorySchema = joi.object({
    name: joi.string().max(validations.subCategoryMax).required(),
    parentCategoryId: joi.string().allow(null),
})

module.exports = {
    subCategorySchema,
    categorySchema,
}