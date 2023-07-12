const mongoose = require("mongoose")

const ClassSchema = mongoose.Schema({
    className:{
        type:Number,

    },
    division:{
        type:String,
    },
    maxStudents:{
        type:Number,

    },
    classTeacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    },
    exams:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"exams"
        }
    ],
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"student"
        },
    ],
    weeklyTasks:[
        {
            taskName:{
                type:String,
                required:true
            },
            startDate:{
                type:Date,
                required:true,
            },
            endDate:{
                type:Date,
                required:true
            },
            taskDiscription:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    timeTable:{
        type:String
    }
    
})

const Class = mongoose.model("classes",ClassSchema)

module.exports = Class