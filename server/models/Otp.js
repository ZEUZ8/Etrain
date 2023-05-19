const mongoose = require("mongoose")

const OtpVerification = mongoose.Schema({
    userId:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt:{
        type: Date
    },
    expiredAt:{
        type:Date
    }
})

const OTP = mongoose.model("otp",OtpVerification)

module.exports = OTP