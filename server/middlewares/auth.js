const jwt = require("jsonwebtoken")
const console = require("console");
const Teacher = require("../models/teacher");

const verifyTokenAdmin = async (req, res, next) => {
  console.log("middleWare")
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const verified = jwt.verify(token, "PrincipalTokenSecret");
      req.user = verified;
      if (verified.role === "principal") {
        console.log("admin with token");
        next();
      } else {
        return res.status(403).send("Access Denied");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const verifyTokenTeacher = async (req, res, next) => {
  console.log("Teacher middleWare")
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const verified = jwt.verify(token, "TeacherTokenSecret");
      req.user = verified;
      if (verified.role === "teacher") {
        console.log("teacher with token");
        next();
      } else {
        return res.status(403).send("Access Denied");
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ msg:err.message });
    }
};



const verifyStudent = async (req, res, next) => {
  console.log(req.headers,"consling the data ")
  console.log("student middleWare")
    try {
      let token = req.headers["authorization"];
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      const verified = jwt.verify(token, "StudentTokenSecret");
      req.user = verified;
      if (verified.role === "student") {
        console.log("student with token");
        next();
      } else {
        return res.status(403).send("Access Denied");
      }
    } catch (err) {
      console.log("errot ocured in here")
      res.status(500).json({ msg:err.message });
    }
};



const checkingTeacher = async(req,res,next)=>{
  console.log("checking the teacher")
  try{
    let teacherId = req.user.id
    const teacher = await Teacher.findOne({_id:teacherId})
    if(teacher.class && teacher.division){
      if(teacher.approved){
        next()
      }else{
        res.status(500).json({msg:"Teacher not approved"})
      }
    }else{
      res.status(500).json({msg:"Teacher not Assigned"})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:err.message})
  }

}

module.exports = {
  verifyTokenAdmin,
  verifyTokenTeacher,
  checkingTeacher,
  verifyStudent
}