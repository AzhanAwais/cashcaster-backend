const xlsx = require("xlsx")
const CustomError = require("../services/customError")
const PaginationService = require("../services/paginationService")

class BaseController {
    constructor(model, validationSchema, populateFields, projection) {
        this.model = model
        this.validationSchema = validationSchema
        this.populateFields = populateFields
        this.projection = projection
    }

    async createOne(req, res, next) {
        try {
            const { error } = this.validationSchema.validate(req.body)
            if (error) {
                next(error)
            }
            const data = await this.model.create(req.body)

            res.status(201).send({
                message: "Record created successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }

    async bulkUpload(req, res, next) {
        try {
            const { filter } = req.body

            const filename = req.file.filename
            const file = xlsx.readFile(`./public/uploads/${filename}`)
            const sheetName = file.SheetNames[0]
            const sheet = file.Sheets[sheetName]
            const sheetData = xlsx.utils.sheet_to_json(sheet)

            const bulkOperations = sheetData?.map(item => ({
                updateOne: {
                    "filter": { [filter]: item.filter },
                    "update": { $set: item },
                    "upsert": true,
                },
            }))

            const data = await this.model.bulkWrite(bulkOperations)

            res.status(201).send({
                message: "Record created successfully",
                data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            const paginationService = new PaginationService(this.model)
            const { data, pagination } = await paginationService.addPagination(query, this.populateFields, this.projection)

            res.status(200).json({
                message: "Record fetch successfully",
                data,
                pagination
            })
        }
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findById({ _id: id }).populate(this.populateFields)

            if (!data) {
                return next(new CustomError(404, "Record not found"))
            }

            res.status(200).send({
                message: "Record fetch successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const { error } = this.validationSchema.validate(req.body)
            if (error) {
                next(error)
            }
            const data = await this.model.findByIdAndUpdate({ _id: id }, req.body, { new: true })
            if (!data) {
                return next(new CustomError(404, "Record not found"))
            }

            res.status(200).send({
                message: "Record updated successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const data = await this.model.findByIdAndDelete({ _id: id })
            if (!data) {
                return next(new CustomError(404, "Record not found"))
            }

            res.status(200).send({
                message: "Record deleted successfully",
                data,
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = BaseController