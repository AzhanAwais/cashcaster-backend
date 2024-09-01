const joi = require("joi")
const { notificationTypes } = require("../constants/constants")

const notificationSchema = joi.object({
    title: joi.string().required(),
    body: joi.string(),
    receiverId: joi.string().required(),
    type: joi.string().valid(...Object.values(notificationTypes)).required(),
})

const markNotificationReadSchema = joi.object({
    id: joi.string().required(),
})

module.exports = {
    notificationSchema,
    markNotificationReadSchema
}  