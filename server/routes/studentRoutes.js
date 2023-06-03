const Router = require("express");
const router = Router();

const  {
    studentRegister,
    studentLogin,
    otpVerification,
    getStudentsAttandence
} = require("../controllers/studentsController");


const {
    verifyStudent
}= require("../middlewares/auth")

router.post("/register", studentRegister)
router.post("/login",studentLogin)
router.post("/verify/:id",otpVerification)
router.get("/attandence",verifyStudent,getStudentsAttandence)

module.exports = router