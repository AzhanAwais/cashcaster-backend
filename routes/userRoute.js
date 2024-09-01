const User = require("../models/User")
const { userRegisterSchema } = require("../schemas/authSchema")
const BaseRoute = require("./baseRoute")

class UserRoute extends BaseRoute {
    static populateFields = []

    constructor() {
        super(User, userRegisterSchema, UserRoute.populateFields)
    }
}

module.exports = UserRoute