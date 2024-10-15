const BaseController = require("./baseController")
const Page = require("../models/Page")
const { pageSchema } = require('../schemas/pageSchema')

class PageController extends BaseController {

    constructor() {
        super(Page, pageSchema)
    }

    async getAllPage(req, res, next) {
        try {
            const { type } = req.query
            let findQuery = {}

            if (type) {
                findQuery.type = type
            }

            const data = await Page.find(findQuery)

            res.status(200).send({
                message: "Pages fetched successfully",
                data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

}

module.exports = PageController