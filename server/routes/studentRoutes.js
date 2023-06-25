const Router = require("express");
const router = Router();

const  {
    studentLogin,
    otpVerification,
    getStudentsAttandence,
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
    GetChatMember
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

module.exports = router 