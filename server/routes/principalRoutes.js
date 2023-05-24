const Router = require("express")
const router = Router()


const {
    classCreation
}= require("../controllers/principalControllers")

router.post("/createClass",classCreation)

module.exports= router