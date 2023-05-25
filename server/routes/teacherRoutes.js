const Router = require("express")
const router = Router()

//controllers for the teachers
const {
    teacherRegister,
    otpVerification,
} = require("../controllers/teacherController")


//middlewares for the teachers

router.post("/register",teacherRegister)
router.post("/verify/:id",otpVerification)

module.exports = router