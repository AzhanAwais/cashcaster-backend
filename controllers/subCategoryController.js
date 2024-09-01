const BaseController = require("./baseController")
const SubCategory = require("../models/SubCategory")
const { subCategorySchema } = require('../schemas/categorySchema')

class SubCategoryController extends BaseController {

    constructor() {
        super(SubCategory, subCategorySchema)
    }

}

module.exports = SubCategoryController