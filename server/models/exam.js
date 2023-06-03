const mongoose = require("mongoose")

const examSchema = mongoose.Schema({
    examName:{
        type:String,
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date
    },
    examDiscription:{
        type:String,
    },
    timeTable:{
        type:String
    }

})


const Exam = mongoose.model("exam",examSchema)

module.exports = Exam