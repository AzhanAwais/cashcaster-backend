const mongoose = require("mongoose")
const { roles, rolesEnum, emailTypesEnum } = require("../constants/constants")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    regions: [{
        type: String,
        required: true
    }],
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true,
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true,
    //     },
    // },
    otp: {
        type: {
            type: String,
            enum: emailTypesEnum
        },
        code: {
            type: String,
            default: null,
        },
        expiresIn: {
            type: Date,
            default: null
        }
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
        default: null
    },
    role: {
        type: Number,
        required: true,
        default: roles.user,
        enum: rolesEnum,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    isSocialLogin: {
        type: Boolean,
        default: false,
    },
    deviceType: {
        type: String,
        required: false,
    },
    deviceToken: {
        type: String,
        required: false
    },
    clientToken: {
        type: String,
        required: false
    },
    platformType: {
        type: String,
        required: false
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken:
    {
        type: String,
        default: null
    },
    resetPasswordTokenExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

userSchema.index({ location: '2dsphere' });

module.exports = User