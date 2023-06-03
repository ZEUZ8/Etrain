const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const { sendNewMail } = require("./studentsController");
const Teacher = require("../models/teacher");
const OTP = require("../models/Otp");
const Class = require("../models/Class");
const Student = require("../models/students");
const Attandence = require("../models/attandence");
const moment = require('moment');
// const { options } = require("../routes/teacherRoutes");

//controller for handling the teacher signUp funcion
const teacherRegister = async (req, res) => {
  const { name, phone, email, password, subject, resume } = req.body;
  console.log("entered ate the teacher register contollers");
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Teacher.create({
      name: name,
      phone: phone,
      email: email,
      subject: subject,
      password: hashedPassword,
    });
    const mail = await sendNewMail(result);
    if (!mail) {
      res.json(500).json({ msg: "Erro ! unable to send Mail" });
    } else {
      res.status(200).json({
        msg: "Teacher Accound Created",
        user: "teacher",
        id: result._id,
        email: result.email,
      });
    }
  } catch (error) {
    console.log(`error occured in the backend controllers ${error}`);
  }
};

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
      if (existingTeacher.verification === false) {
        sendNewMail(existingTeacher, res);
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
        res.status(500).json({ msg: "weekly task not created" });
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
      res.status(500).json({ msg: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Task not found" });
  }
};

//controller function for finding all students in the class
const getStudents = async (req, res) => {
  const teacherId = req.user.id;
  console.log(teacherId);
  try {
    const teacher = await Teacher.findOne({ _id: teacherId });
    // const students = await Student.find({studentClass:teacher.class,division:teacher.division})
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
  console.log(req.body);
  try {
    // const currentDate = 
    // const dateString = currentDate;
    //     const dateObject = moment.utc(dateString).add(1, "days");
    //     const formattedISOString = dateObject.toISOString();

   
    for(i=0;i<req.body.length;i++){
      const { status, student } = req.body[i];
      const { studentClass, division, _id } = student;
      const options = {
        upsert: true, // Create a new document if it doesn't exist
        new: true, // Return the updated document
      }
      const existingClass = await Class.findOne({
        className: studentClass,
        division: division,
      });
      const classId = existingClass._id;
      const date = new Date(Date.now())      
      const formattedDate = date.toISOString().substring(0, 10);
      console.log(formattedDate)
      var response = await Attandence.findOneAndUpdate({
        classId: classId,
        studentId: _id,
      },
      {
        $push:{
          attandence:{
            status:status,
            day:date
          }
        }
      },options);
    }

    console.log(response)
    if(response){
      res.status(200).json({msg:"Marked succesfully"})
    }else{
      res.status(500).json({msg:"Not marked"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }

};



module.exports = {
  teacherRegister,
  teacherLogin,
  otpVerification,
  createWeeklyTask,
  getWeeklyTask,
  getStudents,
  markStudentAttadence,
  
};
