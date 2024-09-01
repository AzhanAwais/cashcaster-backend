class PaginationService {
    constructor(model) {
        this.model = model
    }

    async addPagination(query = {}, populateFields = [], projection = {}) {
        let data = []
        let pagination = null
        const findQuery = this.getFindQuery(query)

        const sortOrder = query.sort == 'asc' ? 1 : -1
        const sort = sortOrder || 1
        const sortBy = query.sortBy || "createdAt"

        let queryBuilder = this.model.find(findQuery, projection).sort({ [sortBy]: sort })

        if (query.paginate) {
            const page = parseInt(query.page) || 1
            const perPage = parseInt(query.perPage) || 10
            const skip = (page - 1) * perPage

            queryBuilder.skip(skip).limit(perPage)

            const totalRecords = await this.model.countDocuments(findQuery)
            const totalPages = Math.ceil(totalRecords / perPage)
            pagination = { page, perPage, totalRecords, totalPages }
        }

        if (populateFields.length > 0) {
            queryBuilder.populate(populateFields)
        }

        data = await queryBuilder.exec()

        return {
            data,
            ...(pagination && { pagination: pagination })
        }
    }

    async addPaginationToAggregation(aggregate = [], query = {}, findQuery = {}) {
        let pagination = null

        if (query.paginate) {
            const page = parseInt(query.page) || 1
            const perPage = parseInt(query.perPage) || 10
            const skip = (page - 1) * perPage

            const totalRecords = await this.model.find(findQuery).countDocuments()
            const totalPages = Math.ceil(totalRecords / perPage)

            pagination = { page, perPage, totalRecords, totalPages }

            aggregate.push(
                {
                    '$skip': skip
                },
                {
                    '$limit': parseInt(perPage)
                }
            )
        }

        const data = await this.model.aggregate(aggregate)

        return {
            data,
            ...(pagination && { pagination: pagination })
        }

    }

    getFindQuery(query = {}) {
        const findQuery = { ...query }
        const deleteFromFindQuery = ["paginate", "page", "perPage", "sort", "sortBy"]

        for (const key in findQuery) {
            if (deleteFromFindQuery.includes(key)) {
                delete findQuery[key]
            }
        }

        return findQuery
    }
}

module.exports = PaginationService
