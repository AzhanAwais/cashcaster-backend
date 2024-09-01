const joi = require("joi")

const startChatSchema = joi.object({
    cashOfferId: joi.string().required(),
    participants: joi.array().items(joi.string()).required(),
})

module.exports = {
    startChatSchema,
}