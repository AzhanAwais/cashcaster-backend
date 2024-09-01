const BaseController = require("./baseController")
const Category = require("../models/Category")
const { categorySchema } = require('../schemas/categorySchema')

class CategoryController extends BaseController {

    constructor() {
        super(Category, categorySchema)
    }
}

module.exports = CategoryController