const Router = require("express");
const router = Router();

const  {
    studentLogin,
    otpVerification,
    
    getStudentsAttandence,
    GetMonthlyAttendance,

    GetReviews,
    GetComplaints,
    GetExams,

    CreateLeave,
    GetLeaves,

    GetCurrentStudent,
    UpdateCurrentStudent,

    CreateConversation,
    GetConversation,

    CreateMessages,
    GetMessages,
    GetChatMember,

    GetTeachers,
    StudentGoogleLogin,

    GetProgress,
    GetTimeTable,
} = require("../controllers/studentsController");


const {
    verifyStudent
}= require("../middlewares/auth")

const mid = async(req,res,next)=>{
    console.log(' inthe min fucntinon of the')
    next()
}

// router.post("/register", studentRegister)

router.post("/login",studentLogin)

router.post("/googleLogin",mid,StudentGoogleLogin)

router.post("/verify/:id",otpVerification)

router.get("/attandence",verifyStudent,getStudentsAttandence)

router.get('/monthlyAttendance',verifyStudent,GetMonthlyAttendance)

router.get("/teachers",verifyStudent,GetTeachers)

router.get('/reviews',verifyStudent,GetReviews)

router.get('/complaints',verifyStudent,GetComplaints)

router.get('/exams',verifyStudent,GetExams)

router.get("/leave",verifyStudent,GetLeaves)

router.post("/leave",verifyStudent,CreateLeave)

router.get("/student/:id",verifyStudent,GetCurrentStudent)

router.put("/student/:id",verifyStudent,UpdateCurrentStudent)

router.get('/chatMember/:id',verifyStudent,GetChatMember)

//new conversation
router.post("/conversation",verifyStudent,CreateConversation)

//new conversation
router.get("/conversation/:userId",verifyStudent,GetConversation)

//add mesages
router.post('/messages',verifyStudent,CreateMessages)

//get messages
router.get("/messages/:conversationId",verifyStudent,GetMessages)

router.get("/progress",verifyStudent,GetProgress)

router.get("/timeTable",verifyStudent,GetTimeTable)

module.exports = router 