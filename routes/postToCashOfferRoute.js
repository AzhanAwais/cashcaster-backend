
const PostToCashOfferController = require("../controllers/postToCashOfferController")
const authMiddleware = require("../middlewares/authMiddleware")
const PostToCashOffer = require("../models/PostToCashOffer")
const { postToCashOfferSchema } = require("../schemas/postToCashOfferSchema")
const BaseRoute = require("./baseRoute")

class PostToCashOfferRoute extends BaseRoute {
    static populateFields = ["userId", "cashOfferId"]

    constructor() {
        super(PostToCashOffer, postToCashOfferSchema, PostToCashOfferRoute.populateFields)
        this.addAdditionalRoutes()
    }

    addAdditionalRoutes() {
        this.postToCashOfferController = new PostToCashOfferController()

        this.router.get("/get-my-post-to-cash-offers", authMiddleware, this.postToCashOfferController.getMyPostsToCashOffer.bind(this))
        this.router.get("/view-post-to-cash-offer/:id", authMiddleware, this.postToCashOfferController.viewPostToCashOffer.bind(this))
        this.router.get("/statistics", authMiddleware, this.postToCashOfferController.getStatsPostsToCashOffer.bind(this))

    }

}

module.exports = PostToCashOfferRoute
