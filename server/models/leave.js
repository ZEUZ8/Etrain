const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"teacher"
  },
  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'student'
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  reason:{
    type:String,
    required:true
  },
  user:{
    type:String,
    required:true
  }
},{timeStamps:true});

const Leave = mongoose.model("leave", leaveSchema);

module.exports = Leave;
