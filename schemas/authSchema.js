const joi = require("joi")
const { validations, rolesEnum, emailTypesEnum } = require("../constants/constants")

const userRegisterSchema = joi.object({
    firstname: joi.string().min(validations.firstnameMin).max(validations.firstnameMax).required(),
    lastname: joi.string().min(validations.lastnameMin).max(validations.lastnameMax).required(),
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().min(validations.passwordMin).max(validations.passwordMax).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')),
    phone: joi.string().min(validations.phoneMin).max(validations.phoneMax),
    locationName: joi.string().max(validations.locationNameMax).required(),
    region: joi.string().max(validations.regionMax).required(),
    location: joi.object({
        type: joi.string().valid('Point').required(),
        coordinates: joi.array().items(joi.number().min(-180).max(180)).length(2).required()
    }),
    dob: joi.string(),
    bio: joi.string().max(validations.bioMax),
    profileImage: joi.string(),
    role: joi.number().valid(...rolesEnum),
})

const userLoginSchema = joi.object({
    email: joi.string().max(validations.emailMax).required(),
    password: joi.string().max(validations.passwordMax).required(),
    deviceType: joi.string().required(),
    deviceToken: joi.string().required(),
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
}