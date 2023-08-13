const mongoose = require("mongoose")

const timeTableSchema = mongoose.Schema({
    classNmae:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Classes"
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    timeTable:{
        type:String
    }
})

const TimeTable = mongoose.model("timeTable",timeTableSchema)

module.exports = TimeTable
