const PageController = require("../controllers/pageController")
const Page = require("../models/Page")
const { pageSchema } = require("../schemas/pageSchema")
const BaseRoute = require("./baseRoute")

class PageRoute extends BaseRoute {
    static populateFields = []
    static projection = {}

    constructor() {
        super(Page, pageSchema, PageRoute.populateFields, PageRoute.projection)
        this.addAdditionalRoutes()
    }

    addAdditionalRoutes() {
        this.pageController = new PageController()

        // this.router.get("/page", this.pageController.getAllPage.bind(this))
    }
}

module.exports = PageRoute