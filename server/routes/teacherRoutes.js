const Router = require("express")
const router = Router()

//controllers for the teachers
const {
    teacherRegister,
    teacherLogin,
    otpVerification,
    createWeeklyTask ,
    getWeeklyTask,
    
    addNewStudent,
    getStudents,
    
    markStudentAttadence,
    makeComplaint,
    GetComplaints,
    UpdateComplaints,

    makeReview,
    GetReviews,
    UpdateReviews
} = require("../controllers/teacherController")


//middlewares for the teachers
const {
    verifyTokenTeacher,
    checkingTeacher
} = require("../middlewares/auth")

// router.post("/register",teacherRegister)

router.post("/login",teacherLogin)

router.post("/verify/:id",otpVerification)

router.put("/weeklyTask",verifyTokenTeacher,checkingTeacher,createWeeklyTask)

router.get("/weeklyTask",verifyTokenTeacher,checkingTeacher,getWeeklyTask)

router.put("/students",verifyTokenTeacher,checkingTeacher,addNewStudent)

router.get("/students",verifyTokenTeacher,checkingTeacher,getStudents)

router.post("/attandence",verifyTokenTeacher,markStudentAttadence)

router.post("/complaint",verifyTokenTeacher,makeComplaint)

router.get("/complaint",verifyTokenTeacher,GetComplaints)

router.put("/complaint",verifyTokenTeacher,UpdateComplaints)

router.post("/review",verifyTokenTeacher,checkingTeacher,makeReview)

router.get("/review",verifyTokenTeacher,GetReviews)

router.put("/review",verifyTokenTeacher,UpdateReviews)

module.exports = router