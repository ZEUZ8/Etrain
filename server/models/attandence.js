const mongoose = require("mongoose")

const attendenceSchema = mongoose.Schema({
        studentId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'students',
        },
        classId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"class"
        },
        attandence:[
            {
                day:{
                    type:String,
                },
                status:{
                    type:String
                },
                reason:{
                    type:String
                }
            }
        ]
})


const Attandence = mongoose.model('attandence',attendenceSchema)

module.exports = Attandence