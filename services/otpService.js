class OtpService {
    generateOtp() {
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        return otp
    }

    getExpiresIn() {
        return new Date(new Date().getTime() + 1 * 60 * 1000)
    }
}

module.exports = new OtpService()
