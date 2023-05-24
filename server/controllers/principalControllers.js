const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const Class = require("../models/Class")


const classCreation = async (req, res)=>{
    const {className,division,classTeacher,maxStudents} = req.body
    try{
        const existingClass = await Class.findOne({className:className,division:division})
        if(existingClass){
            res.json({msg:"class Already Added"})
        }
        else{
            const respons = await Class.create({className,division,classTeacher,maxStudents})
            if(respons){
                res.status(200).json({msg:"created"})
            }else{
                console.log("entered in the else case of the class creatioin respons")
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"calss not created"})
    }
}

module.exports = {
    classCreation
}