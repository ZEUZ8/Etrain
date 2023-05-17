const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const Student = require("../models/students")

const studentRegister = async (req,res) => {
    console.log("student signup, At backend controllers")
    const {name,phone,email,password,studentClass,division} = req.body
    try{
        const hashedPassword = await bcrypt.hash(password,12)
        const result = await Student.create({
            name,
            phone,
            email,
            studentClass,
            division,
            password:hashedPassword
        })
        console.log(`user created ${result}`)
        res.status(200).json({msg:"Account created"})
    }catch(error){
        console.log(`error at the student signUp, backen controllers ${error.message}`)
        res.status(500).json({msg:"somthing went wrong"})
    }

}

module.exports={
    studentRegister
}