const nodemailer = require("nodemailer")
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM } = require("../config/index");
const { emailTypes } = require("../constants/constants");

class EmailService {
    host; port; user; pass; from;

    constructor() {
        this.host = EMAIL_HOST
        this.port = EMAIL_PORT
        this.user = EMAIL_USER
        this.pass = EMAIL_PASSWORD
        this.from = EMAIL_FROM
    }

    async sendEmail(to, subject = "", html = "") {
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.pass,
            },
        })

        const email = await transporter.sendMail({
            from: this.from,
            to: to,
            subject: subject,
            html: html
        })

        return email
    }

    getEmailSubject(emailType) {
        if (emailType == emailTypes.register) {
            return "Account Registration - Verify Your Account with OTP"
        }
        else if (emailType == emailTypes.forgotPassword) {
            return "Password Reset Request"
        }
        else if (emailType == emailTypes.resendOtp) {
            return "Resending OTP for Your Account"
        }
    }

    getEmailHtml(user, otp = "", emailType = emailTypes.register) {
        if (emailType == emailTypes.register) {
            return (
                `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Account Registration - Verify Your Account with OTP</h2>
                    <p>Dear ${user.fullname},</p>
                    <p>Thank you for registration! To complete the registration process and ensure the security of your account, please verify your identity by entering the One-Time Password (OTP) provided below:</p>
                    <p style="font-weight: bold;">OTP: ${otp}</p>
                    <p>Please use this OTP to verify your account on our website or application. If you did not initiate this registration, please disregard this email, and if you have any concerns, contact our support team immediately.</p>
                </div>`
            )
        }
        else if (emailType == emailTypes.forgotPassword) {
            return (
                `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Dear ${user.fullname},</p>
                    <p>We received a request to reset the password associated with your account. To proceed with the password reset, please follow the instructions below:</p>
                    <p style="font-weight: bold;">Password Reset Code: ${otp}</p>
                    <p>If you did not initiate this request, you can safely ignore this email. The password reset code will expire after a certain period for security reasons.</p>
                </div>`
            )
        }
        else if (emailType == emailTypes.resendOtp) {
            return (
                `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Resending OTP for Your Account</h2>
                    <p>Dear ${user.fullname},</p>
                    <p>We hope this message finds you well. It appears that you may not have received the One-Time Password (OTP) for your account. No worries, we've got you covered!</p>
                    <p>Please find your new OTP below:</p>
                    <p style="font-weight: bold;">New OTP:  ${otp}</p>
                    <p>Use this code to complete the registration process and secure your account.</p>
                </div>`
            )
        }
    }
}

module.exports = new EmailService()