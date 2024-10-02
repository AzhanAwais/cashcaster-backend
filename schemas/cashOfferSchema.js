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
    status: joi.string().valid(...Object.values(cashOfferStatus)),
    // location: joi.array().items(
    //     joi.object({
    //         country: joi.string().max(validations.categoryMax).required(), 
    //         state: joi.string().max(validations.stateMax).required(),
    //         regions: joi.array().items(joi.string().max(validations.regionMax).required()).required()
    //     })
    // )
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