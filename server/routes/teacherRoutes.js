const Router = require("express");
const router = Router();

//controllers for the teachers
const {
  // teacherRegister,
  teacherLogin,
  otpVerification,
  createWeeklyTask,
  getWeeklyTask,

  addNewStudent,
  getStudents,

  markStudentAttadence,
  makeComplaint,
  GetComplaints,
  UpdateComplaints,

  makeReview,
  GetReviews,
  UpdateReviews,

  GetExams,

  CreateExamMarks,
  getExamMarks,

  CreateLeave,
  GetLeaves,

  GetCurrentTeacher,
  UpdateTeacher,
  GetChatMember
} = require("../controllers/teacherController");

const {
  CreateConversation,
  GetConversation,
  CreateMessages,
  GetMessages,
} = require("../controllers/studentsController");

//middlewares for the teachers
const { verifyTokenTeacher, checkingTeacher } = require("../middlewares/auth");

// router.post("/register",teacherRegister)

router.post("/login", teacherLogin);

router.post("/verify/:id", otpVerification);

router.put(
  "/weeklyTask",
  verifyTokenTeacher,
  checkingTeacher,
  createWeeklyTask
);

router.get("/weeklyTask", verifyTokenTeacher, checkingTeacher, getWeeklyTask);

router.put("/students", verifyTokenTeacher, checkingTeacher, addNewStudent);

router.get("/students", verifyTokenTeacher, checkingTeacher, getStudents);

router.post("/attandence", verifyTokenTeacher, markStudentAttadence);

router.post("/complaint", verifyTokenTeacher, makeComplaint);

router.get("/complaint", verifyTokenTeacher, GetComplaints);

router.put("/complaint", verifyTokenTeacher, UpdateComplaints);

router.post("/review", verifyTokenTeacher, checkingTeacher, makeReview);

router.get("/review", verifyTokenTeacher, GetReviews);

router.put("/review", verifyTokenTeacher, UpdateReviews);

router.get("/exams", verifyTokenTeacher, GetExams);

router.get("/marks/:studentId/:examId", verifyTokenTeacher, getExamMarks);

router.put("/marks", verifyTokenTeacher, CreateExamMarks);

router.get("/leave", verifyTokenTeacher, GetLeaves);

router.post("/leave", verifyTokenTeacher, CreateLeave);

router.get("/teacher/:id", verifyTokenTeacher, GetCurrentTeacher);

router.put("/teacher/:id", verifyTokenTeacher, UpdateTeacher);

router.post("/conversation", verifyTokenTeacher, CreateConversation);

router.get('/chatMember/:id',verifyTokenTeacher,GetChatMember)

//new conversation
router.get("/conversation/:userId", verifyTokenTeacher, GetConversation);

//add mesages
router.post("/messages", verifyTokenTeacher, CreateMessages);

//get messages
router.get("/messages/:conversationId", verifyTokenTeacher, GetMessages);

module.exports = router;
