const Router = require("express");
const router = Router();

const  {
    studentRegister
} = require("../controllers/studentsController")


router.post("/register", studentRegister)

module.exports = router