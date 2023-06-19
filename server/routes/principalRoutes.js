const Router = require("express")
const router = Router()

// controllers for the principal
const {
    principalLogin,
    classCreation,
    getClasses,
    getTeachers,
    updateTeachers,
    createExam,
    GetExam,
    addNewTeacher,
    // otpVerification,

    GetCurrentPrincipal,
    UpdateCurrentPrincipal

}= require("../controllers/principalControllers")

//middlewares for the principal
const {verifyTokenAdmin} = require("../middlewares/auth")

router.post("/login",principalLogin)

router.post("/createClass",verifyTokenAdmin,classCreation)

router.get("/classes",verifyTokenAdmin,getClasses)

router.post("/teachers",verifyTokenAdmin,addNewTeacher)

router.put("/teachers",verifyTokenAdmin,updateTeachers)

router.get("/teachers",verifyTokenAdmin,getTeachers)

router.post('/exam',verifyTokenAdmin,createExam)

router.get('/exam',verifyTokenAdmin,GetExam)

router.get('/principal/:id',verifyTokenAdmin,GetCurrentPrincipal)

router.put('/principal/:id',verifyTokenAdmin,UpdateCurrentPrincipal)

// router.post("/verify/:id",otpVerification)

module.exports= router