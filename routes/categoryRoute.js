const { routesWithRolePermission } = require("../constants/constants")
const Category = require("../models/Category")
const { categorySchema } = require("../schemas/categorySchema")
const BaseRoute = require("./baseRoute")

class CategoryRoute extends BaseRoute {
    static populateFields = []
    static projection = {}

    constructor() {
        super(Category, categorySchema, CategoryRoute.populateFields, CategoryRoute.projection)
    }
}

module.exports = CategoryRoute