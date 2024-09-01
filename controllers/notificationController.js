const NotificationService = require("../services/notificationService")
const { notificationSchema, markNotificationReadSchema } = require("../schemas/notificationSchema")
const notificationService = require("../services/notificationService")

class NotificationController {

    async createOne(req, res, next) {
        try {
            const currUser = req.user

            const { error } = notificationSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const data = await NotificationService.sendNotification(currUser._id.toString(), req.body)

            res.status(200).send({
                message: "Notification send successfully",
                data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            const currUser = req.user

            const { data, pagination } = await notificationService.getAllNotifications(currUser._id.toString(), query)

            res.status(200).send({
                message: "Notification fetched successfully",
                data,
                pagination
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async markNotificationRead(req, res, next) {
        try {
            const { id: notificationId } = req.body

            const { error } = markNotificationReadSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const data = await NotificationService.markAsRead(notificationId)

            res.status(200).send({
                message: "Notification read successfully",
                data
            })
        }
        catch (e) {
            return next(e)
        }
    }
}

module.exports = NotificationController