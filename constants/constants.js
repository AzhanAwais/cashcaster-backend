const validations = {
    emailMax: 64,

    nameMin: 3,
    nameMax: 32,

    firstnameMin: 3,
    firstnameMax: 32,

    lastnameMin: 3,
    lastnameMax: 32,

    usernameMin: 3,
    usernameMax: 32,

    businessNameMin:3,
    businessNameMax:32,

    businessTypeMin:3,
    businessTypeMax:32,

    passwordMin: 6,
    passwordMax: 32,

    phoneMin: 13,
    phoneMax: 13,

    categoryMax: 32,
    subCategoryMax: 32,
    titleMax: 64,
    descriptionMax: 255,
    messageMax: 255,

    bioMax: 320,
    regionMax: 32,
    stateMax: 64,
    countryMax: 64,
    cityMax: 64,

    otpMin: 4,
    otpMax: 4,

    zipMin: 5,
    zipMax: 5,

    groupNameMin: 3,
    groupNameMax: 32,
    groupDescriptionMax: 120
}


const validationsText = {
    emailMax: `Email: Maximum ${validations.emailMax} characters are allowed`,
    emailRequired: "Email is required",
    emailUnique: "Email already exists",

    nameMin: `Name: Maximum ${validations.nameMin} characters are allowed`,
    nameMax: `Name: Maximum ${validations.nameMax} characters are allowed`,
    nameRequired: `Name is required`,

    firstnameMin: `First name: Maximum ${validations.firstnameMin} characters are allowed`,
    firstnameMax: `First name: Maximum ${validations.firstnameMax} characters are allowed`,
    firstnameRequired: `First name is required`,

    lastnameMin: `Last name: Maximum ${validations.lastnameMin} characters are allowed`,
    lastnameMax: `Last name: Maximum ${validations.lastnameMax} characters are allowed`,
    lastnameRequired: `Last name is required`,

    usernameMin: `Username: Maximum ${validations.usernameMin} characters are allowed`,
    usernameMax: `Username: Maximum ${validations.usernameMax} characters are allowed`,
    usernameRequired: `Username is required`,

    passwordRequired: "Password is required",
    passwordMin: `Password: Minimim ${validations.passwordMin} characters are allowed`,
    passwordMax: `Password: Maximum ${validations.passwordMax} characters are allowed`,

    otpRequired: "Otp is required",
    otpTypeRequired: "Otp type is required",
    otpMin: `Otp: Minimum ${validations.otpMin} characters are allowed`,
    otpMax: `Otp: Maximum ${validations.otpMax} characters are allowed`,

    phoneMin: `Phone: Minimum ${validations.phoneMin} digits are allowed`,
    phoneMax: `Phone: Maximum ${validations.phoneMax} digits are allowed`,
    phoneRequried: `Phone number is requried`,

    messageMax: `Message: Maximum ${validations.messageMax} characters are allowed`,
    
    groupNameMin: `Name: Minimum ${validations.groupNameMin} characters are allowed`,
    groupNameMax: `Name: Maximum ${validations.groupNameMax} characters are allowed`,

    bioMax: `Bio: Maximum ${validations.bioMax} characters are allowed`,
    regionMax: `Region: Maximum ${validations.regionMax} characters are allowed`,
    locationNameMax: `Location name: Maximum ${validations.locationNameMax} characters are allowed`,
    titleMax: `Title: Maximum ${validations.titleMax} characters are allowed`,

    messageTypeRequired: `Message type is required`,
    senderRequried: `Sender id is required`,
    receiverRequired: `Receiver id type is required`,
    userIdsRequired: "User ids is requried",
    chatIdRequired: "Chat id is required",
}

const roles = {
    superAdmin: 1,
    admin: 2,
    user: 3
}

const messageTypes = {
    text: "text",
    image: "image",
    video: "video",
    audio: "audio",
    doc: "doc",
}

const offerTypes = {
    service: "service",
    product: "product"
}

const emailTypes = {
    register: "register",
    forgotPassword: "forgotPassword",
    resendOtp: "resendOtp"
}

const cashOfferStatus = {
    pending: "pending",
    accepted: "accepted",
    rejected: "rejected"
}

const notificationTypes = {
    offerPostedOnCashOffer: "offerPostedOnCashOffer",
    cashOfferAccepted: "cashOfferAccepted",
    cashOfferRejected: "cashOfferRejected"
}

const routesWithRolePermission = {
    category: {
        createOne: [roles.superAdmin],
        bulkUpload: [roles.superAdmin],
        getAll: [roles.admin, roles.superAdmin, roles.user],
        getOne: [roles.admin, roles.superAdmin, roles.user],
        updateOne: [roles.superAdmin],
        deleteOne: [roles.superAdmin]
    }
}

const rolesEnum = [roles.superAdmin, roles.admin, roles.user]
const messageTypesEnum = [messageTypes.audio, messageTypes.doc, messageTypes.image, messageTypes.text, messageTypes.video]
const emailTypesEnum = [emailTypes.forgotPassword, emailTypes.register]

module.exports = {
    validations,
    validationsText,
    roles,
    emailTypes,
    messageTypes,
    rolesEnum,
    messageTypesEnum,
    emailTypesEnum,
    offerTypes,
    cashOfferStatus,
    notificationTypes,
    routesWithRolePermission
}