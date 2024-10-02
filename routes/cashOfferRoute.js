
const CashOfferController = require("../controllers/cashOfferController")
const authMiddleware = require("../middlewares/authMiddleware")
const CashOffer = require("../models/CashOffer")
const { cashOfferSchema } = require("../schemas/cashOfferSchema")
const BaseRoute = require("./baseRoute")

class CashOfferRoute extends BaseRoute {
    static populateFields = ["parentCategoryId", "subCategoryId"]

    constructor() {
        super(CashOffer, cashOfferSchema, CashOfferRoute.populateFields)
        this.addAdditionalRoutes()
    }

    addAdditionalRoutes() {
        this.cashOfferController = new CashOfferController()

        this.router.get("/get-all-cash-offers", this.cashOfferController.getAllCashOffers.bind(this))
        this.router.post("/cash-offer-clicked", authMiddleware, this.cashOfferController.cashOfferClicked.bind(this))
        this.router.get("/get-my-cash-offers", authMiddleware, this.cashOfferController.getMyCashOffers.bind(this))
        this.router.get("/view-cash-offer/:id", this.cashOfferController.viewCashOffer.bind(this))
        this.router.post("/accept-reject-cash-offer", authMiddleware, this.cashOfferController.acceptRejectCashOffer.bind(this))
        this.router.get("/search", this.cashOfferController.searchCashOffer.bind(this))
        this.router.get("/statistics", authMiddleware, this.cashOfferController.getStatsCashOffer.bind(this))

    }

}

module.exports = CashOfferRoute
