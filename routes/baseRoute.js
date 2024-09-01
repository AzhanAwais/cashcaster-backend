const express = require("express")
const BaseController = require("../controllers/baseController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")
const uploadFileMiddleware = require("../middlewares/uploadFileMiddleware")

class BaseRoute {
    constructor(model, validationSchema, populateFields, projection) {
        this.model = model
        this.validationSchema = validationSchema
        this.populateFields = populateFields
        this.projection = projection
        this.router = new express.Router()
        this.baseController = new BaseController(this.model, this.validationSchema, this.populateFields, this.projection)

        this.router.post(`/create`, [authMiddleware], this.baseController.createOne.bind(this))
        this.router.post(`/bulk-upload`, [authMiddleware], uploadFileMiddleware.single("file"), this.baseController.bulkUpload.bind(this))
        this.router.get(`/get-all`, [authMiddleware], this.baseController.getAll.bind(this))
        this.router.get(`/view/:id`, [authMiddleware], this.baseController.getOne.bind(this))
        this.router.put(`/update/:id`, [authMiddleware], this.baseController.updateOne.bind(this))
        this.router.delete(`/delete/:id`, [authMiddleware], this.baseController.deleteOne.bind(this))
    }
}

module.exports = BaseRoute