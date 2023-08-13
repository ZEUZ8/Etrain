const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const { sendNewMail } = require("./principalControllers");
const Teacher = require("../models/teacher");
const OTP = require("../models/Otp");
const Class = require("../models/Class");
const Student = require("../models/students");
const Attandence = require("../models/attandence");
const moment = require("moment");
const Complaint = require("../models/complaint");
const Review = require("../models/Review");
const Exam = require("../models/exam");
const Mark = require("../models/marks");
const Leave = require("../models/leave");
const Admin = require("../models/admin");
const cloudinary = require("cloudinary").v2;

// const { options } = require("../routes/teacherRoutes");

// //controller for handling the teacher signUp funcion
// const teacherRegister = async (req, res) => {
//   const { name, phone, email, password, subject } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const result = await Teacher.create({
//       name: name,
//       phone: phone,
//       email: email,
//       subject: subject,
//       password: hashedPassword,
//     });
//     const mail = await sendNewMail(result);
//     if (!mail) {
//       res.json(500).json({ msg: "Erro ! unable to send Mail" });
//     } else {
//       res.status(200).json({
//         msg: "Teacher Accound Created",
//         user: "teacher",
//         id: result._id,
//         email: result.email,
//       });
//     }
//   } catch (error) {
//     console.log(`error occured in the backend controllers ${error}`);
//   }
// };

//controller for handling the teacher login function
const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingTeacher = await Teacher.findOne({ email: email });
    if (!existingTeacher) {
      res.json({ msg: "teacher don't exist" });
    } else {
      const checkedPassword = await bcrypt.compare(
        password,
        existingTeacher.password
      );
      if (!checkedPassword) {
        res.json({ msg: "Invalid Credentials" });
      } else {
        const token = jwt.sign(
          {
            name: existingTeacher.name,
            email: existingTeacher.email,
            id: existingTeacher.id,
            role: "teacher",
          },
          process.env.TEACHERTOKEN,
          { expiresIn: "2d" }
        );
        res.status(200).json({
          msg: "login succesfull",
          token: token,
          user: "teacher",
          id: existingTeacher._id,
          email: existingTeacher.email,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error at teacher login" });
  }
};

const teacherGoogleLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingTeacher = await Teacher.findOne({ email: email });
    if (!existingTeacher) {
      res.json({ msg: "Teacher don't exists" });
    } else {
      const token = jwt.sign(
        {
          name: existingTeacher.name,
          email: existingTeacher.email,
          id: existingTeacher._id,
          role: "teacher",
        },
        process.env.TEACHERTOKEN,
        { expiresIn: "2d" }
      );
      res.status(200).json({
        token: token,
        msg: "login succesfull",
        user: "teacher",
        id: existingTeacher._id,
        email: existingTeacher.email,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: `error at teacher login` });
    console.log(
      `error at the teacher login,controller,backend --> ${error.message}`
    );
  }
};

const otpVerification = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
  try {
    //checking that otp sended user have added to the OTP collection if not, then the verifacation mail has not sended to the user
    const checking = await OTP.findOne({ userId: id });

    const verifacationOtp = await bcrypt.compare(otp, checking.otp);

    if (verifacationOtp) {
      //checking, the finded user id is existing the user collection and the otp is right
      const change = await Teacher.findOneAndUpdate(
        { _id: id },
        { ververification: true }
      );
      if (change) {
        const Token = jwt.sign(
          {
            name: change.name,
            email: change.email,
            id: change._id,
            role: "teacher",
          },
          process.env.TEACHERTOKEN,
          { expiresIn: "2d" }
        );
        res.status(200).json({
          msg: "verified",
          user: "teacher",
          id: change._id,
          email: change.email,
          token: Token,
        });
      }
    } else {
      console.log("otp not match");
      res.status(500).json({ msg: "Not Verified" });
    }
  } catch (error) {
    console.log(`error at the otp verification teacher--> ${error}`);
  }
};

//controller fucntion for the teacher to  schedule a new task for the class that he/she assigned
const createWeeklyTask = async (req, res) => {
  const { taskName, startDate, endDate, taskDiscription } = req.body;
  const teacherId = req.user.id;

  try {
    const classTeacher = await Teacher.findOne({ _id: teacherId });

    const { division } = classTeacher;

    const existingTask = await Class.exists({
      className: classTeacher.class,
      division: division,
      weeklyTasks: { $elemMatch: { taskName: taskName } },
    });

    if (existingTask) {
      console.log("task existing tit datratbase");
      res.json({ msg: "Task already added" });
    } else {
      const response = await Class.findOneAndUpdate(
        { className: classTeacher.class, division: division },
        {
          $push: {
            weeklyTasks: {
              taskName: taskName,
              startDate: startDate,
              endDate: endDate,
              taskDiscription: taskDiscription,
            },
          },
        }
      );
      if (response) {
        res
          .status(200)
          .json({ msg: "weekly task created", weeklyTask: response });
      } else {
        res.status(500).json({ msg: "You are not Assigned" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "weekly task not created" });
  }
};

//controller function for the teacher innoder to get all the scheduled tasks
const getWeeklyTask = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const teacher = await Teacher.findOne({ _id: teacherId });
    const existingClass = await Class.findOne({
      className: teacher.class,
      division: teacher.division,
    });
    if (existingClass) {
      res
        .status(200)
        .json({ msg: "succesfull", tasks: existingClass.weeklyTasks });
    } else {
      res.status(500).json({ msg: "Class Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Task not found" });
  }
};

/*controller functio for creating a new student in the class  
by this controller teacher can create student and also he/she can add the student in any existing class
*/
const addNewStudent = async (req, res) => {
  const { studentClass, studentDivision, studentName, studentEmail } = req.body;
  const teacherId = req.user.id;
  const options = {
    upsert: true, // Create a new document if it doesn't exist
    new: true, // Return the updated document
  };
  try {
    const teacher = await Teacher.findOne({ _id: teacherId });
    const existingClass = await Class.findOne({
      className: teacher.class,
      division: teacher.division,
    });
    if (existingClass) {
      console.log("entered in the if condition");
    } else {
      console.log("class where removed");
    }
    const existingStudent = await Student.findOne({ email: studentEmail });
    console.log(existingStudent, "the student is already added");
    if (existingStudent) {
      const students = await Student.findOneAndUpdate(
        { email: studentEmail },
        {
          name: studentEmail,
          email: studentEmail,
          studentClass: studentClass,
          division: studentDivision,
          classId:existingClass._id
        },{new:true}
      );
      if (students) {
        res.status(200).json({ msg: "Student Updated", students: students });
      } else {
        res.status(500).json({ msg: "students not found" });
      }
    } else {
      const sendedMail = await sendNewMail();
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(
        sendedMail.otp.toString(),
        saltRounds
      );
      const result = await Student.create({
        password: hashedOTP,
        name: studentName,
        email: studentEmail,
        studentClass: studentClass,
        division: studentDivision,
        classId: existingClass._id,
      });
      const addClass = await Class.findOneAndUpdate(
        { _id: existingClass._id },
        { $push: { students: result._id } }
      );
      if (result) {
        res.status(200).json({ msg: "Student Created", student: result });
      } else {
        res.status(500).json({ msg: "Student Not Created" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Students not found last" });
  }
};

//controller function for finding all students in the class
const getStudents = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const teacher = await Teacher.findOne({ _id: teacherId }).select(
      "-password"
    );
    const existingClass = await Class.findOne({
      className: teacher.class,
      division: teacher.division,
    });
    if (existingClass) {
      console.log("entered in the if condition");
    } else {
      console.log("class where removed");
    }
    const students = await Student.find({
      studentClass: teacher.class,
      division: teacher.division,
    });
    if (students) {
      res
        .status(200)
        .json({ msg: "succesfull", students: students, teacher: teacher });
    } else {
      res.status(500).json({ msg: "students not foundd" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Students not found" });
  }
};

//controller function for updatiing the student attandence
const markStudentAttadence = async (req, res) => {
  try {
    // const currentDate =
    // const dateString = currentDate;
    //     const dateObject = moment.utc(dateString).add(1, "days");
    //     const formattedISOString = dateObject.toISOString();

    for (i = 0; i < req.body.length; i++) {
      const { status, student } = req.body[i];
      const { studentClass, division, _id } = student;
      const options = {
        upsert: true, // Create a new document if it doesn't exist
        new: true, // Return the updated document
      };
      const existingClass = await Class.findOne({
        className: studentClass,
        division: division,
      });
      const classId = existingClass._id;
      const date = new Date(Date.now());
      const formattedDate = date.toDateString();
      var response = await Attandence.findOneAndUpdate(
        {
          classId: classId,
          studentId: _id,
        },
        {
          $push: {
            attandence: {
              status: status,
              day: formattedDate,
            },
          },
        },
        options
      );
    }
    if (response) {
      res.status(200).json({ msg: "Marked succesfully" });
    } else {
      res.status(500).json({ msg: "Not marked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//controler fucntion for the teacher to make a complaint about the student
const makeComplaint = async (req, res) => {
  try {
    const {
      studentName,
      studentClass,
      studentDivision,
      teacherName,
      teacherSubject,
      complaint,
    } = req.body;
    const existingStudent = await Student.findOne({
      name: studentName,
      studentClass,
      division: studentDivision,
    });
    const teacher = await Teacher.findOne({
      name: teacherName,
      subject: teacherSubject,
    });
    if (existingStudent) {
      if (teacher) {
        const result = await Complaint.create({
          studentId: existingStudent._id,
          teacherId: teacher._id,
          complaint: complaint,
        });
        const respone = await Complaint.findOne({ _id: result?._id })
          .populate("studentId")
          .populate("teacherId");
        res.status(200).json({ msg: "Complaint Created", complaint: respone });
      } else {
        res.status(500).json({ msg: "Teacher Not Found" });
      }
    } else {
      res.status(500).json({ msg: "Student Not Found" });
    }
  } catch (error) {
    // res.status(500).json({msg:"Complaint not created"})
    console.log(error);
  }
};

//controller function for finding all the complaints so the teacher can update and edit the complaints
const GetComplaints = async (req, res) => {
  try {
    const respone = await Complaint.find({})
      .populate(`studentId`, `name studentClass division`)
      .populate(`teacherId`, `name subject division class`);
    if (respone) {
      res.status(200).json({ msg: "succesfull", complaints: respone });
    } else {
      res.status(500).json({ msg: "Complaints Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//controller function for finding and updating the complaint that had created earlier and returning it
const UpdateComplaints = async (req, res) => {
  try {
    const {
      studentName,
      studentClass,
      studentDivision,
      teacherName,
      teacherSubject,
      complaint,
    } = req.body;
    const existingStudent = await Student.findOne({
      name: studentName,
      studentClass,
      division: studentDivision,
    });
    const teacher = await Teacher.findOne({
      name: teacherName,
      subject: teacherSubject,
    });
    if (existingStudent) {
      if (teacher) {
        const respone = await Complaint.findOneAndUpdate(
          {
            studentId: existingStudent._id,
            teacherId: teacher._id,
          },
          {
            studentId: existingStudent._id,
            teacherId: teacher._id,
            complaint: complaint,
          },
          { new: true }
        );
        res.status(200).json({ msg: "Complaint Updated", complaint: respone });
      } else {
        res.status(500).json({ msg: "Teacher Not Found" });
      }
    } else {
      res.status(500).json({ msg: "Student Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//controler fucntion for the teacher to make a review about the student
const makeReview = async (req, res) => {
  try {
    const {
      studentName,
      studentClass,
      studentDivision,
      teacherName,
      teacherSubject,
      complaint,
    } = req.body;
    const existingStudent = await Student.findOne({
      name: studentName,
      studentClass,
      division: studentDivision,
    });
    const teacher = await Teacher.findOne({
      name: teacherName,
      subject: teacherSubject,
    });
    if (existingStudent) {
      if (teacher) {
        const respone = await Review.create({
          studentId: existingStudent._id,
          teacherId: teacher._id,
          review: complaint,
        });
        res.status(200).json({
          msg: "Review Created",
          complaint: {
            teacherId: { name: teacher.name },
            studentId: { name: existingStudent.name },
            review: respone.review,
          },
        });
      } else {
        res.status(500).json({ msg: "Teacher Not Found" });
      }
    } else {
      res.status(500).json({ msg: "Student Not Found" });
    }
  } catch (error) {
    // res.status(500).json({msg:"Complaint not created"})
    console.log(error);
  }
};

//controller function for finding all the Reviews so the teacher can update and edit the Reviews
const GetReviews = async (req, res) => {
  try {
    const respone = await Review.find({})
      .populate(`studentId`, `name studentClass division`)
      .populate(`teacherId`, `name subject division class`);
    console.log(respone, "consoling the review");
    if (respone) {
      res.status(200).json({ msg: "succesfull", complaints: respone });
    } else {
      res.status(500).json({ msg: "Reviews Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//controller function for finding and updating the Reviews that had created earlier and returning it
const UpdateReviews = async (req, res) => {
  try {
    const {
      studentName,
      studentClass,
      studentDivision,
      teacherName,
      teacherSubject,
      complaint,
    } = req.body;
    const existingStudent = await Student.findOne({
      name: studentName,
      studentClass,
      division: studentDivision,
    });
    const teacher = await Teacher.findOne({
      name: teacherName,
      subject: teacherSubject,
    });
    if (existingStudent) {
      if (teacher) {
        const respone = await Review.findOneAndUpdate(
          {
            studentId: existingStudent._id,
            teacherId: teacher._id,
          },
          {
            studentId: existingStudent._id,
            teacherId: teacher._id,
            review: complaint,
          },
          { new: true }
        );
        // console.log(respone)
        res.status(200).json({ msg: "Review Updated", complaint: respone });
      } else {
        console.log("teacher not fone");
        res.status(500).json({ msg: "Teacher Not Found" });
      }
    } else {
      res.status(500).json({ msg: "Student Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* teacher controller function for getting all the existing exams, so the
 teacher teacher could eid the student marks 
*/
const GetExams = async (req, res) => {
  const { id } = req.user;
  console.log("entered in the exam finding function for the teracher");
  try {
    const teacher = await Teacher.findOne({ _id: id });
    const existingExam = await Exam.find({ examClass: teacher.class });
    if (existingExam) {
      res.status(200).json({ msg: "succesfull", exams: existingExam });
    } else {
      res.json({ msg: "Exam not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* teacher controller function for getting the existing edited exam marks and 
if not exists one then create one and return it 
*/
const CreateExamMarks = async (req, res) => {
  const { id } = req.user;
  const { value, exam, studentId } = req.body;
  const options = {
    upsert: true, // Create a new document if it doesn't exist
    new: true, // Return the updated document
  };
  try {
    const teacher = await Teacher.findOne({ _id: id });
    if (teacher) {
      const existingExam = await Exam.findOne({ _id: exam._id });
      if (existingExam) {
        const response = await Mark.findOneAndUpdate(
          { studentId },
          {
            examId: exam._id,
            english: value.english,
            mathematics: value.mathematics,
            science: value.science,
            malayalam: value.malayalam,
            totalMark: value.totalMark,
            grade: value.grade,
            note: value.note,
          },
          options
        );
        res.status(200).json({ msg: "updated", marks: response });
      } else {
        res.json({ msg: "Exam not found" });
      }
    } else {
      res.json({ msg: "Teacher not found" });
    }
    // const existingExam = await Exam.find({examClass:teacher.class})
    // if(existingExam){
    //   res.status(200).json({msg:"succesfull",exams:existingExam})
    // }else{
    //   res.json({msg:"Exam not found"})
    // }
  } catch (error) {
    console.log(error);
    // res.status(500).json({msg:error.message})
  }
};

/* teacher contrller function for getting all the existing edited exam marks and listing all 
 them to the teacher so she/he can edit it
*/
const getExamMarks = async (req, res) => {
  console.log("entered in the exam Marks findinfg  function for the teracher");
  const { studentId, examId } = req.params;
  console.log(studentId, examId, "consoling the id's");
  try {
    const response = await Mark.findOne({
      examId: examId,
      studentId: studentId,
    });
    console.log(response, " consoling the result");
    if (response) {
      res.status(200).json({ msg: "succesfull", Mark: response });
    } else {
      res.json({ msg: "Mark not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/*                      Leave forms                               */
/*controller function for creating a new leave form for the teacher,
innorder to identify the user,extracting the user from the request 
*/
const CreateLeave = async (req, res) => {
  console.log("entered in the leave creating function for the teracher");
  const { startDate, endDate, leaveReason } = req.body;
  const { id, role } = req.user;
  const options = {
    upsert: true, // Create a new document if it doesn't exist
    new: true, // Return the updated document
  };
  try {
    const existingTeacher = await Teacher.findOne({ _id: id });
    if (existingTeacher) {
      const response = await Leave.findOneAndUpdate(
        { teacherId: id, startDate, endDate },
        { reason: leaveReason, user: role },
        options
      );
      if (response) {
        res.status(200).json({ msg: "succesfull", leaves: response });
      } else {
        res.json({ msg: "Leave not Created" });
      }
    } else {
      res.json({ msg: "Teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/*controller function for finding all the existing leaves that 
teacher created and returing int he response
*/
const GetLeaves = async (req, res) => {
  console.log(
    "entered in the Teacher Leaves findinfg  function for the teracher"
  );
  const { id } = req.user;
  try {
    const existingLeaves = await Leave.find({ teacherId: id });
    if (existingLeaves) {
      res.status(200).json({ msg: "succesfull", leaves: existingLeaves });
    } else {
      res.json({ msg: "Leave not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller function for getting the current teacher for the 
profile component, the id for the searching is sended from the front End
as the parms
*/
const GetCurrentTeacher = async (req, res) => {
  console.log("entered in the current teacher finding function");
  const { id } = req.params;
  try {
    const teacher = await Teacher.findOne({ _id: id }).select("-password");
    if (teacher) {
      res.status(200).json({ msg: "succesfull", teacher: teacher });
    } else {
      res.json({ msg: "teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller function for updating the teacher info  for the profile component*/
const UpdateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    if (password) {
      const hashedPassword = bcrypt.hash(password);
      var teacher = await Teacher.findOneAndUpdate(
        { _id: id },
        { name, email, phone, password: hashedPassword },
        { new: true }
      );
    } else {
      var teacher = await Teacher.findOneAndUpdate(
        { _id: id },
        { name, email, phone },
        { new: true }
      );
    }
    if (teacher) {
      res.status(200).json({ msg: "succesfull", teacher: teacher });
    } else {
      res.json({ msg: "Teacher not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* for get the all the chat members*/
const GetChatMember = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ _id: id });
    const principal = await Admin.findOne({ _id: id });
    if (student) {
      res.status(200).json({ msg: "succesfull", user: student });
    }else if (principal) {
      res.status(200).json({ msg: "succesfull", user: principal });
    }else {
      res.json({ msg: "user not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* for get the all the chat members*/
const GetMonthlyAttendance = async (req, res) => {
  const date = new Date();
  const currentMonth = date
    .toLocaleString("default", { month: "long" })
    .slice(0, 3);
  const { id } = req?.user;
  try {
    const teacher = await Teacher.findOne({ _id: id }).populate(
      "assignedClass",
      "_id"
    );

    if (teacher) {
      const response = await Attandence.find({
        classId: teacher?.assignedClass?._id,
      });
      const count = response?.length;
      const attendance = await Attandence.aggregate([
        {
          $match: {
            classId: teacher.assignedClass._id,
            "attandence.day": {
              $regex: currentMonth,
            },
          },
        },

        { $unwind: "$attandence" },
        {
          $group: {
            _id: "$attandence.status",
            count: { $sum: 1 },
          },
        },
      ]);
      if (attendance && attendance.length > 0) {
        res.status(200).json({ attendance, count });
      } else {
        res.json({ msg: "attendance not found" });
      }
    } else {
      res.json({ ms: "teracher Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* for get the all the chat members*/
const GetAnnualAttendance = async (req, res) => {
  const date = new Date();
  const currentYeart = date.getFullYear();
  const currentYear = currentYeart.toString();
  console.log(currentYear);
  const { id } = req?.user;
  try {
    const teacher = await Teacher.findOne({ _id: id }).populate(
      "assignedClass",
      "_id"
    );
    if (teacher) {
      const response = await Attandence.find({
        classId: teacher?.assignedClass?._id,
      });
      const count = response?.length;
      const attendance = await Attandence.aggregate([
        {
          $match: {
            classId: teacher.assignedClass._id,
            "attandence.day": {
              $regex: currentYear,
            },
          },
        },

        { $unwind: "$attandence" },
        {
          $group: {
            _id: "$attandence.status",
            count: { $sum: 1 },
          },
        },
      ]);
      if (attendance && attendance.length > 0) {
        res.status(200).json({ attendance, count });
      } else {
        res.json({ msg: "attendance not found" });
      }
    } else {
      res.json({ ms: "teracher Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* for get the class TimeTable for the tacher*/
const GetClassTimeTable = async (req, res) => {
  const { id } = req.user;
  try {
    const teacher = await Teacher.findOne({ _id: id });
    const timeTable = await Class.findOne({ _id : teacher?.assignedClass });
    if (timeTable) {
      res.status(200).json(timeTable);
    } else {
      res.json({ msg: "timeTable not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller function for uploading the class time table */
const UploadTimeTable = async (req, res) => {
  const { image } = req.body;
  const { id } = req.user;
  try {
    console.log("before the upload");
    // const file = await cloudinary.uploader.upload(image, {
    //   folder: "images",
    // });
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API,
      api_secret: process.env.API_SECRET,
      secure: true,
    });
    const file = await cloudinary.uploader.upload(image, {
      folder: "image",
    });
    console.log(file)
    if (file) {
      const teacher = await Teacher.findOne({ _id: id });
      const timeTable = await Class.findOneAndUpdate(
        { _id: teacher?.assignedClass },
        { timeTable: file.secure_url }
        ,{new:true});
      if (timeTable) {
        res.status(200).json(timeTable);
      } else {
        res.json({ msg: "timeTable not Found" });
      }
    } else {
      res.status(500).json({ msg: "Image Not Uploaded" });
    }
  } catch (error) {
    console.log("njn", error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  // teacherRegister,
  teacherLogin,
  teacherGoogleLogin,

  otpVerification,
  createWeeklyTask,
  getWeeklyTask,
  getStudents,

  markStudentAttadence,
  GetMonthlyAttendance,
  GetAnnualAttendance,

  makeComplaint,
  GetComplaints,
  UpdateComplaints,
  makeReview,
  GetReviews,
  UpdateReviews,
  addNewStudent,

  GetExams,

  CreateExamMarks,
  getExamMarks,

  CreateLeave,
  GetLeaves,

  GetCurrentTeacher,
  UpdateTeacher,
  GetChatMember,

  UploadTimeTable,
  GetClassTimeTable,
};
