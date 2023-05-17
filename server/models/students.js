const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
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
    tempToken:{
        type:String,
    },
    address:{
        type:String
    },
    gardian:{
        type:Object,
        gardianName:{
            type:String
        },
        gardianPhone:{
            type:Number
        },
        gardianEmail:{
            type:String
        }
    }
})
const Student = mongoose.model("student",StudentSchema)

module.exports = Student