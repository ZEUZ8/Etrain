const Router = require("express");
const router = Router();

const  {
    studentRegister,
    studentLogin,
    otpVerification
} = require("../controllers/studentsController");


router.post("/register", studentRegister)
router.post("/login",studentLogin)
router.post("/verify/:id",otpVerification)

module.exports = router