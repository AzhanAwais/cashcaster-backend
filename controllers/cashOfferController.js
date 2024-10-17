const { cashOfferClickedSchema, cashOfferAcceptedRejectedSchema } = require("../schemas/cashOfferSchema")
const CashOfferService = require("../services/cashOfferService")
const CustomError = require("../services/customError")

class CashOfferController {

    async getAllCashOffers(req, res, next) {
        try {
            const query = req.query
            const currUser = req.user
            const { data, pagination } = await CashOfferService.findAllCashOffers(currUser?._id.toString(), query)

            res.status(200).send({
                message: "All Cash offers fetched successfully",
                data,
                pagination
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async cashOfferClicked(req, res, next) {
        try {
            // const { userId, cashOfferId } = req.body
            const { cashOfferId } = req.body
            const currUser = req.user

            const { error } = cashOfferClickedSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            // if (userId == currUser?._id.toString()) {
            //     return res.status(200).send({
            //         message: "Cash offer clicked",
            //         data: null,
            //     })
            // }

            // const data = await CashOfferService.onCashOfferClicked(userId, cashOfferId)
            const data = await CashOfferService.onCashOfferClicked(currUser?._id, cashOfferId)

            res.status(200).send({
                message: "Cash offer clicked",
                data: data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getMyCashOffers(req, res, next) {
        try {
            const { status } = req.query
            const query = req.query
            const currUser = req.user

            const { data, pagination } = await CashOfferService.findMyCashOffers(currUser?._id.toString(), status, query)

            res.status(200).send({
                message: "My Cash offer fetched successfully",
                data,
                pagination
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async viewMyCashOffer(req, res, next) {
        try {
            const { id: cashOfferId } = req.params

            const data = await CashOfferService.findCashOfferById(cashOfferId)

            res.status(200).send({
                message: "My Cash offer fetched successfully",
                data: data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async acceptRejectCashOffer(req, res, next) {
        try {
            const { cashOfferId, status } = req.body
            const currUser = req.user

            const { error } = cashOfferAcceptedRejectedSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const data = await CashOfferService.acceptRejectOffer(currUser?._id.toString(), cashOfferId, status)

            res.status(200).send({
                message: "My Cash offer accepted successfully",
                data: data,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async searchCashOffer(req, res, next) {
        try {
            const query = req.query
            const currUser = req.user

            const { data, pagination } = await CashOfferService.searchCashOffer(currUser?._id.toString(), query)

            res.status(200).send({
                message: "Cash offer fetched successfully",
                data,
                pagination
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getStatsCashOffer(req, res, next) {
        try {
            const currUser = req.user

            const data = await CashOfferService.findStatsCashOffer(currUser?._id.toString())

            res.status(200).send({
                message: "Cash offer stats fetched successfully",
                data: data
            })
        }
        catch (e) {
            return next(e)
        }
    }
}

module.exports = CashOfferController