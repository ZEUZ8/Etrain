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
            examName:{
                type:String,
            },
            totalMark:{
                type:Number
            },
            subjects:{
                type:Array,
                subjects:{
                    Object,
                    subjectName:{
                        type:String,
                    },
                    subjectMark:{
                        type:Number
                    }
                }
            }
        }
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
    ]
})

const Class = mongoose.model("classes",ClassSchema)

module.exports = Class