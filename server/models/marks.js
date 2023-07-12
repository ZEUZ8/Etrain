const mongoose = require("mongoose");

const marksShcema = mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student"
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"exam"
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"class"
    },
    totalMark:{
        type:String,

    },
    grade:{
        type:String,
    },
    malayalam:{
        type:String,
    },
    mathematics:{
        type:String
    },
    english:{
        type:String
    },
    science:{
        type:String
    },
    note:{
        type:String
    }
},{timestamps:true});

const Mark = mongoose.model("mark", marksShcema);

module.exports = Mark;
