const HaveQuestion = require("../models/HaveQuestion")
const HowWeHelp = require("../models/HowWeHelp")
const { howWeHelpSchema, haveQuestionSchema } = require("../schemas/generalSchema")

class GeneralController {

    async howWeHelp(req, res, next) {
        try {
            const { error } = howWeHelpSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const data = await HowWeHelp.create({...req.body})
            
            res.status(200).json({
                message: "Your request has been submitted successfully",
                data: data
            })

        }
        catch (e) {
            return next(e)
        }
    }

    async haveQuestion(req, res, next) {
        try {
            const { error } = haveQuestionSchema.validate(req.body)
            if (error) {
                return next(error)
            }

            const data = await HaveQuestion.create({...req.body})
            
            res.status(200).json({
                message: "Your question has been submitted successfully",
                data: data
            })

        }
        catch (e) {
            return next(e)
        }
    }

    

 
}

module.exports = GeneralController