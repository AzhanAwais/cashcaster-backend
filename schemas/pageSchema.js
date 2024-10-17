const joi = require("joi")

const pageSchema = joi.object({
    title: joi.string().required(),
    slug: joi.string().required(),
    content: joi.required(),
})

module.exports = {
    pageSchema,
}