const mongoose = require("mongoose")

const TeacherSchema = mongoose.Schema({
    name:{
        type:String,
        requuired:true
    },
    phone:{
        type:Number,
    },
    email:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false
    },
    assignedClass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes"
    },
    class:{
        type:Number
    },
    division:{
        type:String
    },
    subject:{
        type:String,
        required:true
    },
    address:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true
    },

})

const Teacher = mongoose.model("teacher",TeacherSchema)

module.exports = Teacher
