const joi = require("joi")
const { validations, offerTypes } = require("../constants/constants")

const postToCashOfferSchema = joi.object({
    userId: joi.string(),
    offerTypes: joi.string().valid(...Object.values(offerTypes)).required(),
    cashOfferId:joi.string().required(),
    description: joi.string().max(validations.descriptionMax).allow(null),
    image: joi.array().items(joi.string()),
})


module.exports = {
    postToCashOfferSchema,
}  