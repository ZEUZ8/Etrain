const mongoose = require("mongoose")

const TeacherSchema = mongoose.Schema({
    name:{
        type:String,
        requuired:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false
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
    resume:{
        type:String
    },
    qualification:{
        type:Object,
        passedOutYear:{
            type:String,
            required:true
        },
        collegeName:{
            type:String,
            requierd:true
        },
        certificate:{
            type:String,
            required:true
        },
        experience:{
            type:String,
            required:true
        }
    }

})

const Teacher = mongoose.model("teacher",TeacherSchema)

module.exports = Teacher
