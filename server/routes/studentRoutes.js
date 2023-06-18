const Router = require("express");
const router = Router();

const  {
    studentRegister,
    studentLogin,
    otpVerification,
    getStudentsAttandence,
    GetReviews,
    GetComplaints,
    GetExams,

    CreateLeave,
    GetLeaves,

    GetCurrentStudent
} = require("../controllers/studentsController");


const {
    verifyStudent
}= require("../middlewares/auth")

// router.post("/register", studentRegister)

router.post("/login",studentLogin)

router.post("/verify/:id",otpVerification)

router.get("/attandence",verifyStudent,getStudentsAttandence)

router.get('/reviews',verifyStudent,GetReviews)

router.get('/complaints',verifyStudent,GetComplaints)

router.get('/exams',verifyStudent,GetExams)

router.get("/leave",verifyStudent,GetLeaves)

router.post("/leave",verifyStudent,CreateLeave)

router.get("/student/:id",verifyStudent,GetCurrentStudent)



module.exports = router