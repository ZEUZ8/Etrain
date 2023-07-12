const Router = require("express")
const router = Router()

// controllers for the principal
const {
    principalLogin,

    classCreation,
    getClasses,
    GetClass,
    
    getTeachers,
    GetAvailableTeacher,

    updateTeachers,

    createExam,
    GetExam,
    UpdateExam,

    addNewTeacher,
    // otpVerification,

    GetLeaves,
    GetAllAttendance,

    GetCurrentPrincipal,
    UpdateCurrentPrincipal,

    GetChatMember,

    GetStudents,
    PrincipalGoogleLogin,

}= require("../controllers/principalControllers")

const {
    CreateConversation,
    GetConversation,
    CreateMessages,
    GetMessages,
  } = require("../controllers/studentsController");

//middlewares for the principal
const {verifyTokenAdmin} = require("../middlewares/auth")

router.post("/login",principalLogin)

router.post("/googleLogin",PrincipalGoogleLogin)

router.post("/createClass",verifyTokenAdmin,classCreation)

router.get("/classes",verifyTokenAdmin,getClasses)

router.post("/teachers",verifyTokenAdmin,addNewTeacher)

router.put("/teachers",verifyTokenAdmin,updateTeachers)

router.get("/teachers",verifyTokenAdmin,getTeachers)

router.post('/exam',verifyTokenAdmin,createExam)

router.get('/exam',verifyTokenAdmin,GetExam)

router.put('/exam/:id',verifyTokenAdmin,UpdateExam)

router.get('/principal/:id',verifyTokenAdmin,GetCurrentPrincipal)

router.put('/principal/:id',verifyTokenAdmin,UpdateCurrentPrincipal)

router.get('/leaves',verifyTokenAdmin,GetLeaves)

router.get('/chatMember/:id',verifyTokenAdmin,GetChatMember)

// router.post("/verify/:id",otpVerification)

router.post("/conversation",verifyTokenAdmin,CreateConversation)

//new conversation
router.get("/conversation/:userId",verifyTokenAdmin,GetConversation)

//add mesages
router.post('/messages',verifyTokenAdmin,CreateMessages)

//get messages
router.get("/messages/:conversationId",verifyTokenAdmin,GetMessages)

router.get("/availableTeacher",verifyTokenAdmin,GetAvailableTeacher)

router.get(`/attendance/:date`,verifyTokenAdmin,GetAllAttendance)

router.get(`/students/:id`,verifyTokenAdmin,GetStudents)

module.exports= router