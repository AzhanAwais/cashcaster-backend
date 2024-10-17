const CustomError = require("./customError")
const PostToCashOffer = require("../models/PostToCashOffer")
const mongoose = require("mongoose")
const PaginationService = require("./paginationService")

class PostToCashOfferService {

    async findMyPostsToCashOffer(currUserId, query) {
        const aggregate = [
            {
                '$match': {
                    'userId': new mongoose.Types.ObjectId(currUserId),
                }
            }, {
                '$lookup': {
                    'from': 'categories',
                    'localField': 'parentCategoryId',
                    'foreignField': '_id',
                    'as': 'parentCategoryId'
                }
            }, {
                '$unwind': {
                    'path': '$parentCategoryId',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'subcategories',
                    'localField': 'subCategoryId',
                    'foreignField': '_id',
                    'as': 'subCategoryId'
                }
            }, {
                '$unwind': {
                    'path': '$subCategoryId',
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$sort': {
                    'createdAt': -1,
                },
            },
        ]

        if (query.offerType) {
            if (query.offerType) {
                aggregate.splice(1, 0, {
                    '$match': {
                        'offerType': query.offerType
                    },
                })
            }
        }

        let findQuery = {
            userId: currUserId.toString(),
            ...(query.offerType && { offerType: query.offerType }),
        }

        const paginationService = new PaginationService(PostToCashOffer)
        const { data, pagination } = await paginationService.addPaginationToAggregation(aggregate, query, findQuery)

        return { data, pagination }
    }

    async findPostToCashOfferById(id) {
        const [myCashOffers] = await PostToCashOffer.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(id),
                }
            }, {
                '$lookup': {
                    'from': 'categories',
                    'localField': 'parentCategoryId',
                    'foreignField': '_id',
                    'as': 'parentCategoryId'
                }
            }, {
                '$unwind': {
                    'path': '$parentCategoryId',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'subcategories',
                    'localField': 'subCategoryId',
                    'foreignField': '_id',
                    'as': 'subCategoryId'
                }
            }, {
                '$unwind': {
                    'path': '$subCategoryId',
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$lookup': {
                    'from': "cashoffers",
                    'localField': "cashOfferId",
                    'foreignField': "_id",
                    'as': "cashOfferId"
                }
            },
            {
                '$unwind': {
                    'path': "$cashOfferId",
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$lookup': {
                    'from': 'cashofferclickeds',
                    'localField': '_id',
                    'foreignField': 'cashOfferId',
                    'as': 'cashOfferClicked'
                }
            }, {
                '$addFields': {
                    'totalClicks': {
                        '$size': '$cashOfferClicked'
                    }
                }
            }, {
                '$project': {
                    'cashOfferClicked': 0
                }
            }, {
                '$lookup': {
                    'from': 'cashofferaccepteds',
                    'localField': '_id',
                    'foreignField': 'cashOfferId',
                    'as': 'acceptedOffer'
                }
            }, {
                '$addFields': {
                    'isOfferAccepted': {
                        '$cond': {
                            'if': {
                                '$gt': [
                                    {
                                        '$size': '$acceptedOffer'
                                    }, 0
                                ]
                            },
                            'then': true,
                            'else': false
                        }
                    }
                }
            },
            {
                '$unwind': {
                    'path': '$acceptedOffer',
                    'preserveNullAndEmptyArrays': true
                }
            },
            {
                '$addFields': {
                    'acceptedBy': {
                        '$cond': {
                            'if': '$isOfferAccepted',
                            'then': '$acceptedOffer.userId',
                            'else': null
                        }
                    },
                    'acceptedOn': {
                        '$cond': {
                            'if': '$isOfferAccepted',
                            'then': '$acceptedOffer.createdAt',
                            'else': null
                        }
                    }
                }
            }, {
                '$sort': {
                    'createdAt': -1
                }
            }, {
                '$project': {
                    'acceptedOffer': 0,
                    'isOfferAccepted': 0
                }
            }
        ])

        return myCashOffers
    }

    async findStatsPostsToCashOffer(currUserId) {
        let postsToCashOfferPerMonth = await PostToCashOffer.aggregate([
            {
                '$match': {
                    'userId': new mongoose.Types.ObjectId(currUserId)
                }
            }, {
                '$group': {
                    '_id': {
                        'year': {
                            '$year': '$createdAt'
                        },
                        'month': {
                            '$month': '$createdAt'
                        }
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$sort': {
                    '_id.year': 1,
                    '_id.month': 1
                }
            }, {
                '$project': {
                    '_id': 0,
                    'year': '$_id.year',
                    'month': '$_id.month',
                    'count': 1
                }
            }
        ])

        return postsToCashOfferPerMonth
    }

}

module.exports = new PostToCashOfferService()