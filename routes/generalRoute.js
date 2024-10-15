const express = require("express")
const GeneralController = require("../controllers/generalController")

class GeneralRoute {
    constructor() {
        this.router = new express.Router()
        this.generalController = new GeneralController()

        this.router.post("/how-we-help", this.generalController.howWeHelp.bind(this))
        this.router.post("/have-question", this.generalController.haveQuestion.bind(this))
    }
}

module.exports = GeneralRoute