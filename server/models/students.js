const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        trim:true
    },
    email:{
      type:String,
      required:true  
    },
    password:{
        type:String,
        required:true
    },
    studentClass:{
        type:Number,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes"
    },
    address:{
        type:String
    },
    verification:{
        type:Boolean,
        default:false
    },
    profile:{
        type:'string'
    }
})
const Student = mongoose.model("student",StudentSchema)

module.exports = Student