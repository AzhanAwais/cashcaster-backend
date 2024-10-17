const State = require("../models/State")
const { stateSchema } = require("../schemas/categorySchema")
const BaseRoute = require("./baseRoute")

class StateRoute extends BaseRoute {
    static populateFields = []
   
    constructor() {
        super(State, stateSchema, StateRoute.populateFields)
    }
}

module.exports = StateRoute