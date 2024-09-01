const PostToCashOfferService = require("../services/postToCashOfferService")
const CustomError = require("../services/customError")

class PostToCashOfferController {

    async getMyPostsToCashOffer(req, res, next) {
        try {
            const query = req.query
            const currUser = req.user

            const { data, pagination } = await PostToCashOfferService.findMyPostsToCashOffer(currUser._id.toString(), query)

            res.status(200).send({
                message: "My posts to cash offer fetched successfully",
                data,
                pagination
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async viewPostToCashOffer(req, res, next) {
        try {
            const id = req.params

            const myCashOffers = await PostToCashOfferService.findPostToCashOfferById(id)

            res.status(200).send({
                message: "My post to cash offer fetched successfully",
                data: myCashOffers,
            })
        }
        catch (e) {
            return next(e)
        }
    }

    async getStatsPostsToCashOffer(req, res, next) {
        try {
            const currUser = req.user

            const data = await PostToCashOfferService.findStatsPostsToCashOffer(currUser._id.toString())

            res.status(200).send({
                message: "Post to cash offer stats fetched successfully",
                data: data
            })
        }
        catch (e) {
            return next(e)
        }
    }
    
}

module.exports = PostToCashOfferController