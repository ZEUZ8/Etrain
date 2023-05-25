const Router = require("express")
const router = Router()

// controllers for the principal
const {
    classCreation,
    getClasses,
    getTeachers,
    // otpVerification
}= require("../controllers/principalControllers")

//middlewares for the principal

router.post("/createClass",classCreation)
router.get("/classes",getClasses)
router.get("/teachers",getTeachers)
// router.post("/verify/:id",otpVerification)

module.exports= router