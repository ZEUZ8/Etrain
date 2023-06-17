const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  examName: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  examClass: {
    type: Number,
    required: true,
  },
  examDiscription: {
    type: String,
  },
  timeTable: {
    type: String,
  },
  
});

const Exam = mongoose.model("exam", examSchema);

module.exports = Exam;
  