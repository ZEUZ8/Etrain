const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    createdAt:{
        type: Date
    },
    expiredAt:{
        type:Date
    }
})

const Admin = mongoose.model("admins",adminSchema)

module.exports = Admin
