const Router = require("express")
const router = Router()

//controllers for the teachers
const {
    teacherRegister,
    teacherLogin,
    otpVerification,
    createWeeklyTask ,
    getWeeklyTask,
    getStudents,
    markStudentAttadence,
} = require("../controllers/teacherController")


//middlewares for the teachers
const {
    verifyTokenTeacher,
    checkingTeacher
} = require("../middlewares/auth")

router.post("/register",teacherRegister)
router.post("/login",teacherLogin)
router.post("/verify/:id",otpVerification)
router.put("/weeklyTask",verifyTokenTeacher,checkingTeacher,createWeeklyTask)
router.get("/weeklyTask",verifyTokenTeacher,checkingTeacher,getWeeklyTask)
router.get("/students",verifyTokenTeacher,checkingTeacher,getStudents)
router.post("/attandence",verifyTokenTeacher,markStudentAttadence)
module.exports = router