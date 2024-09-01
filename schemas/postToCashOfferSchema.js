const joi = require("joi")
const { validations } = require("../constants/constants")

const postToCashOfferSchema = joi.object({
    userId: joi.string(),
    cashOfferId:joi.string().required(),
    description: joi.string().max(validations.descriptionMax).allow(null),
    image: joi.array().items(joi.string()),
})


module.exports = {
    postToCashOfferSchema,
}  