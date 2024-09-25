const joi = require("joi")
const { offerTypes, validations, cashOfferStatus } = require("../constants/constants")

const cashOfferSchema = joi.object({
    userId: joi.string(),
    offerTypes: joi.string().valid(...Object.values(offerTypes)).required(),
    tags: joi.array().items(joi.string()),
    title: joi.string().max(validations.titleMax).required(),
    price: joi.number().required(),
    parentCategoryId: joi.string().required(),
    subCategoryId: joi.string().required(),
    description: joi.string().max(validations.descriptionMax).allow(null),
    image: joi.string().allow(null),
    status: joi.string().valid(...Object.values(cashOfferStatus))
})

const cashOfferClickedSchema = joi.object({
    // userId: joi.string().required(),
    cashOfferId: joi.string().required(),
})

const cashOfferAcceptedRejectedSchema = joi.object({
    cashOfferId: joi.string().required(),
    status: joi.string().valid(cashOfferStatus.accepted, cashOfferStatus.rejected).required()
})

module.exports = {
    cashOfferSchema,
    cashOfferClickedSchema,
    cashOfferAcceptedRejectedSchema
}  