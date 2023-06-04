const mongoose = require("mongoose")

const ReviewSchema = mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    },
    review:{
        type:String,
    }

})


const Review = mongoose.model("review",ReviewSchema)

module.exports = Review