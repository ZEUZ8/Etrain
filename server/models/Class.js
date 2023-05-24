const mongoose = require("mongoose")

const ClassSchema = mongoose.Schema({
    className:{
        type:Number,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    maxStudents:{
        type:Number,
        required:true
    },
    classTeacher:{
        type:String,
        required:true
    },
    exams:{
        type:Array,
        exam:{
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
    }
})

const Class = mongoose.model("classes",ClassSchema)

module.exports = Class