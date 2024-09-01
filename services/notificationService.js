const Notification = require("../models/Notification")
const User = require("../models/User")
const CustomError = require("./customError")
const PaginationService = require("./paginationService")
const pushNotificationService = require("./pushNotificationService")
const mongoose = require("mongoose")

class NotificationService {
    async sendNotification(senderId, notification) {
        const { title, body, receiverId, type } = notification

        const receciverUser = await User.findById({ _id: receiverId })

        const payload = {
            to: receciverUser?.deviceToken,
            notification: {
                title: title,
                body: body,
            },
            data: {
                title: "title",
                body: "body"
            }
        }

        const newNotification = await Notification.create({
            ...notification,
            senderId,
            isRead: false
        })
        // await pushNotificationService.sendPushNotification(payload)

        return newNotification
    }

    async getAllNotifications(currUserId, query) {
        const aggregate = [
            {
                '$match': {
                    'receiverId': new mongoose.Types.ObjectId(currUserId),
                }
            }
        ]

        let findQuery = {
            receiverId: currUserId.toString(),
        }

        const paginationService = new PaginationService(Notification)
        const { data, pagination } = await paginationService.addPaginationToAggregation(aggregate, query, findQuery)

        return { data, pagination }
    }

    async markAsRead(notificationId) {
        const notification = await Notification.findByIdAndUpdate({ _id: notificationId }, { isRead: true }, { new: true })
        if (!notification) {
            throw new CustomError(400, `Invalid Id. No notification found`)
        }
        return notification
    }
}

module.exports = new NotificationService()