const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const {sendNewMail} = require("./principalControllers")
const Teacher = require("../models/teacher");
const OTP = require("../models/Otp");
const Class = require("../models/Class");
const Student = require("../models/students");
const Attandence = require("../models/attandence");
const moment = require("moment");
const Complaint = require("../models/complaint");
const Review = require("../models/Review");
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
  console.log(
    "entered at the teacher login controllers in the backend /controllers"
  );
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
            "TeacherTokenSecret",
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
    console.log(error, "  error at the teacher controllers login");
    res.status(500).json({ msg: "error at teacher login" });
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
          "TeacherTokenSecret",
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
    if (existingStudent) {
      const students = await Student.findOneAndUpdate(
        { email: studentEmail },
        {
          name: studentEmail,
          email: studentEmail,
          studentClass: studentClass,
          division: studentDivision,
        }
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
      });
      console.log("all the function where completed", result);
      if (result) {
        res.status(200).json({ msg: "Student Created", student: result });
      } else {
        res.status(500).json({ msg: "Student Not Created" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Students not found" });
  }
};

//controller function for finding all students in the class
const getStudents = async (req, res) => {
  const teacherId = req.user.id;
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
    const students = await Student.find({
      studentClass: teacher.class,
      division: teacher.division,
    });
    if (students) {
      res.status(200).json({ msg: "succesfull", students: students });
    } else {
      res.status(500).json({ msg: "students not found" });
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
      const formattedDate = date.toISOString().substring(0, 10);
      var response = await Attandence.findOneAndUpdate(
        {
          classId: classId,
          studentId: _id,
        },
        {
          $push: {
            attandence: {
              status: status,
              day: date,
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
        const respone = await Complaint.create({
          studentId: existingStudent._id,
          teacherId: teacher._id,
          complaint: complaint,
        });
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

module.exports = {
  // teacherRegister,
  teacherLogin,
  otpVerification,
  createWeeklyTask,
  getWeeklyTask,
  getStudents,
  markStudentAttadence,
  makeComplaint,
  GetComplaints,
  UpdateComplaints,
  makeReview,
  GetReviews,
  UpdateReviews,
  addNewStudent,
};
