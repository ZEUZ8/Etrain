const Router = require("express")
const router = Router()


const {
    classCreation,
    getClasses
}= require("../controllers/principalControllers")

router.post("/createClass",classCreation)
router.get("/classes",getClasses)

module.exports= router