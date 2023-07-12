const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const Class = require("../models/Class");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");
const Exam = require("../models/exam");
const Leave = require("../models/leave");
const Student = require("../models/students");
const Attandence = require("../models/attandence");

//the config contian the password and the user for sending the mail
let config = {
  service: "gmail",
  auth: {
    user: "ptsinan8590@gmail.com",
    pass: "ccykjhaaejmqvsbl",
  },
};

//controller for the handling he principal login function
const principalLogin = async (req, res) => {
  console.log(
    "entered at the principal login controllers in the backend /controllers"
  );
  try {
    const { email, password } = req.body;
    const chumma = Admin.find({});
    const principal = await Admin.findOne({ email: email });
    if (!principal) {
      res.json({ msg: "Invalid Credentials" });
    } else {
      const checkedPassword = await bcrypt.compare(
        password,
        principal.password
      );
      if (!checkedPassword) {
      } else {
        const token = jwt.sign(
          {
            name: principal.name,
            email: principal.email,
            id: principal.id,
            role: "principal",
          },
          "PrincipalTokenSecret",
          { expiresIn: "2d" }
        );
        res
          .status(200)
          .json({
            msg: "login succesfull",
            token: token,
            user: "principal",
            id: principal._id,
            email: principal.email,
          });
      }
    }
  } catch (error) {
    console.log(error, "  error at the teacher controllers login");
    res.status(500).json({ msg: "error at teacher login" });
  }
};


const PrincipalGoogleLogin = async (req, res) => {
  try {
    const {email} = req.body;
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      res.json({ msg: "principal don't exists" });
    } else {
      const token = jwt.sign(
        {
          name: existingAdmin.name,
          email: existingAdmin.email,
          id: existingAdmin._id,
          role: "principal",
        },
        process.env.principalToken,
        { expiresIn: "2d" }
      );
      res.status(200).json({
        token: token,
        msg: "login succesfull",
        user: "principal",
        id: existingAdmin._id,
        email: existingAdmin.email,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: `error at principal login` });
    console.log(
      `error at the principal login,controller,backend --> ${error.message}`
    );
  }
};





// cotroller for handling the class creation by the principal
const classCreation = async (req, res) => {
  const { className, division, classTeacher, maxStudents } = req.body;
  try {
    const existingClass = await Class.findOne({
      className: className,
      division: division,
    });
    // const existingTeahcer = await Teacher.findOne({name:classTeacher})
    // if(!existingTeahcer){
    //   res.status(500).json({msg:"teacher don't exist"})
    // }
    if (existingClass) {
      res.json({ msg: "class Already Added" });
    } else {
      const respons = await Class.create({
        className,
        division,
        // classTeacher,
        maxStudents,
      });
      if (respons) {
        res.status(200).json({ msg: "created", respons });
      } else {
        console.log("entered in the else case of the class creatioin respons");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "calss not created" });
  }
};


//controller function for the principal to find all the classes that have been created
const getClasses = async (req, res) => {
  console.log(
    "entered at the class getting funcion AT backen,principla controllers "
  );
  try {
    const existingClass = await Class.find({}).populate("classTeacher",'-password').populate("students",'-password');
    if (existingClass) {
      res.status(200).json({ msg: "success", classes: existingClass });
    } else {
      res.json({ msg: "Class not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error at the Class finding" });
  }
};


//controller function for getting all the existing teacher
const getTeachers = async (req, res) => {
  console.log(
    "entered at the teachers finding function at backend principal controllers"
  );
  try {
    const existingTeachers = await Teacher.find({});
    if (existingTeachers && existingTeachers.length > 0) {
      res.status(200).json({ teachers: existingTeachers });
    } else {
      console.log("Teachers dont existing");
      res.status(500).json({ msg: "Teachers don't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error at finding Teachers" });
  }
};

//controller function for getting all the teachres who not assigned to classes,then it could show to the principal when creating classes
const GetAvailableTeacher = async (req, res) => {
  console.log(
    "entered at the available teachers finding function at backend principal controllers"
  );
  try {
    const teacher = await Teacher.find({ class: "", division: "" });
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(500).json({ msg: "Teachers don't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error at finding Teachers" });
  }
};

//controller function for updating the teacher
const updateTeachers = async (req, res) => {
  try {
    const { className, division, teacherId } = req.body;
    const existingClass = await Class.findOne({
      className: className,
      division: division,
    });
    if (existingClass) {
      const teacher = await Teacher.findOneAndUpdate(
        { _id: teacherId },
        {
          class: existingClass.className,
          division: existingClass.division,
          assignedClass: existingClass._id,
        }
      );
      const classUpdate = await Class.findOneAndUpdate(
        { className, className, division: division },
        { classTeacher: teacherId }
      );
      if (teacher) {
        res.status(200).json({ msg: "updation successfull", teacher: teacher });
      } else {
        res.status(500).json({ msg: "updation failed" });
      }
    } else {
      res.status(500).json({ msg: "class not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Erro! Teacher Updation" });
  }
};

//controller function for creating new Exam
const createExam = async (req, res) => {
  console.log("entered in the exam creating function");
  try {
    const {
      examName,
      startDate,
      endDate,
      examDiscription,
      timeTable,
      examClass,
    } = req.body;
    const existingExam = await Exam.findOne({ examName: examName });
    if (!existingExam) {
      const response = await Exam.create({
        examName: examName,
        startDate: startDate,
        endDate: endDate,
        examDiscription: examDiscription,
        timeTable,
        examClass,
      });
      const updatedClass = await Class.updateMany(
        { className: examClass },
        { $push: { exams: response._id } }
      );
      if (response) {
        res.status(200).json({ msg: "Exam created", exam: response });
      } else {
        res.status(500).json({ msg: "Exam not created" });
      }
    } else {
      res.status(500).json({ msg: "exam alredy added" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/*controller fucntion for the principal to find all the existing exam and return them 
in this controller the req is already verified so the after that finding all the exam in the exam collection and returning 
all of them
*/
const GetExam = async (req, res) => {
  console.log("enterd in the exam getting function ");
  try {
    const response = await Exam.find({});
    if (response) {
      res.status(200).json({ msg: "success", exams: response });
    } else {
      console.log(response);
      res.status(500).json({ msg: "Couldn't find Exams" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/*                        Update Created Exam                            */
/*controller function for updating the existing exam getting the id from the params and finding and updating 
exam that created by the principal 
*/
const UpdateExam = async (req, res) => {
  console.log("entered in the exam Updating function");
  const { id } = req.params;
  console.log(id, req.body);
  try {
    const {
      examName,
      startDate,
      endDate,
      examDiscription,
      timeTable,
      examClass,
    } = req.body;
    const response = await Exam.findOneAndUpdate(
      { _id: id },
      { examName, examDiscription, startDate, endDate, timeTable, examClass },
      { new: true }
    );
    if (response) {
      res.status(200).json({ msg: "Exam Updated", exam: response });
    } else {
      res.json({ msg: "Exam updation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

{
  /*                                   Add a New Teacher 
Controller function for addin a new teacher in the teacher collection with 
specified email and the OTP created by the sendMail fucntion and it will be the teacher pass word and 
teacher can updat it late as she/he likes */
}
const addNewTeacher = async (req, res) => {
  console.log(req.body);
  console.log("entered in the controller function for adding new taacher");
  try {
    const { teacherName, teacherSubject, teacherEmail } = req.body;
    const existingTeacher = await Teacher.findOne({
      name: teacherName,
      email: teacherEmail,
    });
    if (existingTeacher) {
      res.json({ msg: "Teacher already Added" });
    } else {
      const sendedMail = await sendNewMail();
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(
        sendedMail.otp.toString(),
        saltRounds
      );
      const result = await Teacher.create({
        password: hashedOTP,
        name: teacherName,
        email: teacherEmail,
        subject: teacherSubject,
      });
      console.log("all the function where completed", result);
      if (result) {
        res.status(200).json({ msg: "succesfull", teacher: result });
      } else {
        res.status(500).json({ msg: "Teacher Not Created" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

{
  /*                                   Send Mail 
controller function for creating a new otp and sending that to the specified mail 
through this we can ensure that the provided mail is valid and the teacher can sign up wiht the otp that 
we send and lter on the teacher can eidt the passsword asswell as the teacher data
*/
}
const sendNewMail = async (result) => {
  console.log("entered to the mail sending function");
  try {
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    return new Promise((resolve, rejects) => {
      const mailOptions = {
        from: "ptsinan8590@gmail.com",
        to: "ptsinan8590@gmail.com",
        subject: "Etrain Email Verification",
        text: `Your Password: ${otp}`,
      };
      const transporter = nodeMailer.createTransport(config);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error Occurred:", error);
          rejects(error.message);
        } else {
          resolve({ info, otp });
        }
      });
    });
  } catch (error) {
    console.log("Error Occurred:", error);
    return error.message;
  }
};

/* controller function for getting the current student for the 
profile component, the id for the searching is sended from the front End
as the parms
*/
const GetCurrentPrincipal = async (req, res) => {
  console.log("entered in the current Principal finding function");
  try {
    // const principal = await Admin.findOne({_id:id}).select("-password")
    const principal = await Admin.findOne({}).select("-password");
    if (principal) {
      res.status(200).json({ msg: "succesfull", principal: principal });
    } else {
      res.json({ msg: "principal not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller function for updating the teacher info  for the profile component*/
const UpdateCurrentPrincipal = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    if (password) {
      const hashedPassword = bcrypt.hash(password);
      var principal = await Admin.findOneAndUpdate(
        {},
        { name, email, phone, password: hashedPassword },
        { new: true }
      );
    } else {
      var principal = await Admin.findOneAndUpdate(
        {},
        { name, email, phone },
        { new: true }
      );
    }
    if (principal) {
      res.status(200).json({ msg: "succesfull", principal: principal });
    } else {
      res.json({ msg: "Principal not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller functions for finding all the leaves created by the students and teachers and showing 
them to the principal so he can analys it, and he could rise an Query on the leave forms
*/
const GetLeaves = async (req, res) => {
  console.log("entered in the Leaves finding function");
  try {
    const leaves = await Leave.find({})
      .populate(`studentId`, "-password")
      .populate(`teacherId`, "-password");
    if (leaves) {
      res.status(200).json({ msg: "succesfull", leaves: leaves });
    } else {
      res.json({ msg: "leaves not found" });
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
    const teacher = await Teacher.findOne({ _id: id });
    const student = await Student.findOne({ _id: id });
    if (teacher) {
      res.status(200).json({ msg: "succesfull", user: teacher });
      if (student) {
        res.status(200).json({ msg: "succesfull", user: student });
      }
    } else {
      res.json({ msg: "user not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};



/*controller function  get the all the students inthe class */
const GetStudents = async (req, res) => {
  const { id } = req.params;
  try {
    // const students = await Student.findOne({classId: id }); this code will be reaplaced when the data storing in the db change 
    const existingClass = await Class.findOne({_id:id})
    const students = await Student.find({studentClass:existingClass?.className,division:existingClass?.division})
    if (students){
      res.status(200).json(students);
    } else {
      res.json({ msg: "user not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};



/* for get the all the students attendance */
const GetAllAttendance = async (req, res) => {
  const { date } = req.params;
  console.log(date, "the date right now");
  try {
    const attandence = await Attandence.aggregate([
      {
        $unwind: "$attandence",
      },
      {
        $match: {
          "attandence.day": date,
        },
      },
      {
        $group: {
          _id: "$attandence.status",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log(attandence, " the result");
    if (attandence) {
      res.status(200).json(attandence);
    } else {
      res.json({ msg: "attendance not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  principalLogin,
  PrincipalGoogleLogin,

  classCreation,
  getClasses,

  getTeachers,
  updateTeachers,
  GetAvailableTeacher,

  createExam,
  GetExam,
  UpdateExam,

  addNewTeacher,
  sendNewMail,

  GetCurrentPrincipal,
  UpdateCurrentPrincipal,

  GetLeaves,
  GetAllAttendance,

  GetChatMember,

  GetStudents,
};
