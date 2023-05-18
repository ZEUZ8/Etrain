const Router = require("express");
const router = Router();

const  {
    studentRegister,
    studentLogin
} = require("../controllers/studentsController");


router.post("/register", studentRegister)
router.post("/login",studentLogin)

module.exports = router