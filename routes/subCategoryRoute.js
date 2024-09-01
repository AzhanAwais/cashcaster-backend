const SubCategory = require("../models/SubCategory")
const { subCategorySchema } = require("../schemas/categorySchema")
const BaseRoute = require("./baseRoute")

class SubCategoryRoute extends BaseRoute {
    static populateFields = ['parentCategoryId']
   
    constructor() {
        super(SubCategory, subCategorySchema, SubCategoryRoute.populateFields)
    }
}

module.exports = SubCategoryRoute