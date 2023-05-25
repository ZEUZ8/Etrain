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

const getClasses = async(req,res)=>{
    console.log("entered at the class getting funcion AT backen,principla controllers ")
    try{
        const existingClass = await Class.find({})
        if(existingClass){
            console.log(existingClass)
            res.status(200).json({msg:"success",classes:existingClass})
        }else{
            console.log("entered at the class finding else cas ing he backend controlers")
            res.status(500).json({msg:"Class not found"})
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    classCreation,
    getClasses
}