const CustomError = require("./customError")
const CashOfferClicked = require("../models/CashOfferClicked")
const CashOffer = require("../models/CashOffer")
const mongoose = require("mongoose")
const { cashOfferStatus } = require("../constants/constants")
const CashOfferAccepted = require("../models/CashOfferAccepted")
const PaginationService = require("./paginationService")

class CashOfferService {

    async onCashOfferClicked(userId, cashOfferId) {
        const cashOfferClicked = await CashOfferClicked.findOne({ userId, cashOfferId })

        if (!cashOfferClicked) {
            const newCashOfferClickedDoc = new CashOfferClicked({ userId, cashOfferId })
            const updatedCashOfferClicked = await newCashOfferClickedDoc.save()
            return updatedCashOfferClicked
        }

        return cashOfferClicked
    }

    async findAllCashOffers(currUserId, query) {
        let aggregate = [
            {
                '$match': {
                    'userId': {
                        '$ne': new mongoose.Types.ObjectId(currUserId)
                    },
                    '$or': [
                        { 'status': cashOfferStatus.pending },
                        { 'status': cashOfferStatus.rejected }
                    ]
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
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'userId'
                }
            }, {
                '$unwind': {
                    'path': '$userId',
                    'preserveNullAndEmptyArrays': true
                }
            },

        ]

        let findQuery = {
            userId: { $ne: currUserId.toString() },
            $or: [
                { status: cashOfferStatus.pending },
                { status: cashOfferStatus.rejected }
            ]
        }

        const paginationService = new PaginationService(CashOffer)
        const { data, pagination } = await paginationService.addPaginationToAggregation(aggregate, query, findQuery)

        return { data, pagination }

    }

    async findMyCashOffers(currUserId, status = cashOfferStatus.pending) {
        let aggregate = await CashOffer.aggregate([
            {
                '$match': {
                    'userId': new mongoose.Types.ObjectId(currUserId),
                    'status': status
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
        ])

        let findQuery = {
            userId: currUserId.toString(),
        }

        const paginationService = new PaginationService(CashOffer)
        const { data, pagination } = await paginationService.addPaginationToAggregation(aggregate, query, findQuery)

        return { data, pagination }
    }

    async findCashOfferById(cashOfferId) {
        const [myCashOffers] = await CashOffer.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(cashOfferId),
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
            }, {
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

    async acceptRejectOffer(userId, cashOfferId, status) {
        const acceptCashOfferDoc = new CashOfferAccepted({ userId, cashOfferId, status })
        const newAcceptCashOffer = await acceptCashOfferDoc.save()
        const cashOffer = await CashOffer.findByIdAndUpdate({ _id: cashOfferId }, { status: status }, { new: true })

        if (cashOffer) {
            return newAcceptCashOffer
        }
        throw new CustomError(404, `Cash Offer not found. Invalid Id`)
    }

    async searchCashOffer(currUserId, query) {
        const { sortBy, sort, keyword, category, subCategory, offerType, minPrice, maxPrice, location } = query
        let aggregate = [
            {
                '$match': {
                    'userId': {
                        '$ne': new mongoose.Types.ObjectId(currUserId)
                    },
                    '$or': [
                        { 'status': cashOfferStatus.pending },
                        { 'status': cashOfferStatus.rejected }
                    ]
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
            }
        ]

        if (sortBy) {
            aggregate.push({
                '$sort': {
                    [sortBy]: sort == "asc" ? 1 : -1,
                },
            })
        }

        if (keyword) {
            aggregate.push({
                '$match': {
                    title: new RegExp(keyword, 'i')
                }
            })
        }

        if (category) {
            aggregate.push({
                '$match': {
                    'parentCategoryId.name': { $regex: category, $options: 'i' }
                }
            })
        }

        if (subCategory) {
            aggregate.push({
                '$match': {
                    'subCategoryId.name': { $regex: subCategory, $options: 'i' }
                }
            })
        }

        if (offerType) {
            aggregate.push({
                '$match': {
                    offerType: { $regex: offerType, $options: 'i' }
                }
            })
        }

        if (minPrice && !maxPrice) {
            aggregate.push({
                '$match': {
                    price: { $gte: parseInt(minPrice) }
                }
            })
        }

        if (maxPrice && !minPrice) {
            aggregate.push({
                '$match': {
                    price: { $lte: parseInt(maxPrice) }
                }
            })
        }

        if (minPrice && maxPrice) {
            aggregate.push({
                '$match': {
                    price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
                }
            })
        }

        let findQuery = {
            '$match': {
                'userId': {
                    '$ne': new mongoose.Types.ObjectId(currUserId)
                },
                '$or': [
                    { 'status': cashOfferStatus.pending },
                    { 'status': cashOfferStatus.rejected }
                ]
            }
        }

        const paginationService = new PaginationService(CashOffer)
        const { data, pagination } = await paginationService.addPaginationToAggregation(aggregate, query, findQuery)

        return { data, pagination }
    }

    async findStatsCashOffer(currUserId) {
        let cashOffersPerMonth = await CashOffer.aggregate([
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

        return cashOffersPerMonth
    }

}

module.exports = new CashOfferService()