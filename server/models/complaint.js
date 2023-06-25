const mongoose = require("mongoose")

const complaintShcema = mongoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    },
    complaint:{
        type:String,
    },
    // consplaints:[
    //     {
    //         complaint:{
    //             type:String,
    //         }
    //     }
    // ]

})


const Complaint = mongoose.model("complaint",complaintShcema)

module.exports = Complaint