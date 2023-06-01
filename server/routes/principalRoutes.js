const Router = require("express")
const router = Router()

// controllers for the principal
const {
    principalLogin,
    classCreation,
    getClasses,
    getTeachers,
    updateTeachers,
    // otpVerification
}= require("../controllers/principalControllers")

//middlewares for the principal
const {verifyTokenAdmin} = require("../middlewares/auth")

router.post("/login",principalLogin)
router.post("/createClass",verifyTokenAdmin,classCreation)
router.get("/classes",verifyTokenAdmin,getClasses)
router.get("/teachers",verifyTokenAdmin,getTeachers)
router.put("/teachers",verifyTokenAdmin,updateTeachers)
// router.post("/verify/:id",otpVerification)

module.exports= router