const { default: axios } = require("axios")
const { PUSH_NOTIFICATION_SERVER_KEY } = require("../config/index")

class PushNotificationService {
    async sendPushNotification(payload) {
        const response = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${PUSH_NOTIFICATION_SERVER_KEY}`,
            },
        });
        console.log('Push notification sent successfully:', response)
    }
}

module.exports = new PushNotificationService()