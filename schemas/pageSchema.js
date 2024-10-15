const joi = require("joi")

const pageSchema = joi.object({
    termsAndConditions: joi.string(),
    privacyPolicy: joi.string(),
    aboutUs: joi.string(),
})

module.exports = {
    pageSchema,
}