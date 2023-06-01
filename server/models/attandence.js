const mongoose = require("mongoose")

const attendenceSchema = mongoose.Schema([
    student={
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
        classId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"class"
        }
    },
    [
        {
            day:{
                type:Date,
            },
            status:{
                type:String
            },
            reason:{
                type:String
            }
        }
    ]
])


const Attandence = mongoose.model('attandence',attendenceSchema)

module.exports = Attandence