const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const OTP = require("../models/Otp");
const Student = require("../models/students");
const { resolve } = require("path");
const { rejects, match } = require("assert");
const Attandence = require("../models/attandence");
const { default: mongoose } = require("mongoose");
const Complaint = require("../models/complaint");
const Review = require("../models/Review");
const Exam = require("../models/exam");
const Leave = require("../models/leave")

// let config = {
//   service: "gmail",
//   auth: {
//     user: "ptsinan8590@gmail.com",
//     pass: "ccykjhaaejmqvsbl",
//   },
// };

// const studentRegister = async (req, res) => {
//   console.log("Controllers,Backend,studentLogin");
//   const { name, phone, email, password, studentClass, division } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const result = await Student.create({
//       name,
//       phone,
//       email,
//       studentClass,
//       division,
//       password: hashedPassword,
//     });
//     const mail = await sendNewMail(result);
//     if (!mail) {
//       res.status(500).json({ msg: "Error! unable to send Mail" });
//     } else {
//       // const token = jwt.sign(
//       //     {name:result.name,email:result.email,id:result._id,role:"student"},
//       //     "StudentTokenSecret",
//       //     {expiresIn:"2d"}
//       // )
//       res.status(200).json({
//         msg: "Account Created",
//         user: "student",
//         id: result._id,
//         email: result.email,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: `somthing went wrong` });
//     console.log(
//       `error at the student signUp, backen controllers --> ${error.message}`
//     );
//   }
// };

//Student Login
/*The student login function serves as a mechanism to authenticate and provide access to a specific web or application portal for students. It involves a series of steps to verify the identity of the student and grant them appropriate access.
 Here is a detailed description of the function:
            Existing Student Check: The login function first checks whether the student exists in the system or database. This is done by searching for the student's unique identifier, such as their student ID or username.
                                    If the student is not found, the function sends a message indicating that the student does not exist. This is to prevent unauthorized access attempts from non-registered individuals.

            Password  Verification: If the student exists in the system, the function proceeds to verify the provided password against the stored password associated with that student's account. The function compares the givenpassword with the 
                                    stored password to ensure they match. If the passwords do not match, the function sends a message stating "Invalid credentials." This step ensures that only authorized students with the correct password can gain access.

            Granting Access: If the given password matches the stored password, the function grants access to the student for the Home page or the designated portal. This means the student is successfully authenticated, and they are allowed to proceed further 
                             into the system. At this point, the student can access their personalized information, resources, or perform specific actions based on the privileges assigned to their account.

The purpose of this login function is to ensure the security and privacy of student information by confirming the student's identity and verifying their credentials. By implementing these steps, the function prevents unauthorized users from gaining access to
sensitive data while allowing legitimate students to log in and utilize the system efficiently. */
const studentLogin = async (req, res) => {
  console.log("Controllers,Backend,studentLogin");
  try {
    const { email, password } = req.body;
    const existStudent = await Student.findOne({ email: email });

    if (!existStudent) {
      res.json({ msg: "student don't exists" });
    } else {
      if (existStudent.verification === false) {
        sendNewMail(existStudent);
        res.status(200).json({ msg: "mail not verified" });
      } else {
        const checkedPassword = await bcrypt.compare(
          password,
          existStudent.password
        );

        if (!checkedPassword) {
          res.json({ msg: "Invalid Credentials" });
        } else {
          const token = jwt.sign(
            {
              name: existStudent.name,
              email: existStudent.email,
              id: existStudent._id,
              role: "student",
            },
            "StudentTokenSecret",
            { expiresIn: "2d" }
          );
          res.status(200).json({
            token: token,
            msg: "login succesfull",
            user: "student",
            id: existStudent._id,
            email: existStudent.email,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ msg: `error at student login` });
    console.log(
      `error at the student login,controller,backend --> ${error.message}`
    );
  }
};

// const sendNewMail = async (result) => {
//   console.log("entered to the mail sending function");
//   try {
//     //
//     const check = OTP.findOneAndDelete({ userId: result._id });
//     // Generate OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);

//     const saltRounds = 10;

//     const hashedOTP = await bcrypt.hash(otp.toString(), saltRounds);

//     const verificationOTP = new OTP({
//       userId: result._id,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expiredAt: Date.now() + 3600000,
//     });
//     await verificationOTP.save();

//     return new Promise((resolve, rejects) => {
//       const mailOptions = {
//         from: "ptsinan8590@gmail.com",
//         to: "ptsinan8590@gmail.com",
//         subject: "Etrain Email Verification",
//         text: `Your OTP: ${otp}`,
//       };
//       const transporter = nodeMailer.createTransport(config);

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log("Error Occurred:", error);
//           rejects(error.message);
//         } else {
//           resolve(info);
//         }
//       });
//     });
//   } catch (error) {
//     console.log("Error Occurred:", error);
//     return error.message;
//   }
// };

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
      const change = await Student.findOneAndUpdate(
        { _id: id },
        { ververification: true }
      );
      if (change) {
        const Token = jwt.sign(
          {
            name: change.name,
            email: change.email,
            id: change._id,
            role: "student",
          },
          "StudentTokenSecret",
          { expiresIn: "2d" }
        );
        res.status(200).json({
          msg: "verified",
          user: "student",
          id: change._id,
          email: change.email,
          token: Token,
        });
      }
    } else {
      console.log("otp not match");
    }
  } catch (error) {
    console.log(`error at the otp verification sinan--> ${error}`);
  }
};

//
const getStudentsAttandence = async (req, res) => {
  const userId = req.user.id;

  try {
    const date = new Date(Date.now());
    const formattedDate = date.toISOString().substring(0, 10);
    const checkDate = new Date(formattedDate);
    const CheckMonth = checkDate.getMonth() + 1;

    const response = await Attandence.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$attandence", // Unwind the attendance array
      },
      {
        $group: {
          _id: { $month: "$attandence.day" },
          attendance: { $push: "$attandence" }, // Collect the attendance objects in an array
        },
      },
      {
        $match: {
          _id: CheckMonth,
        },
      },
    ]);
    if (response) {
      res.status(200).json({ msg: "succesfull", presents: response[0] });
    } else {
      res.status(500).json({ msg: "Couldn't find Marked Attandence" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

//student controller for finding all the existing reviews
const GetReviews = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await Review.find({ studentId: id })
      .populate(`studentId`, `name studentClass division`)
      .populate(`teacherId`, `name subject division class`);
    if (response) {
      res.status(200).json({ msg: "succesfull", reviews: response });
    } else {
      res.status(500).json({ msg: "Review Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//student controller for finding all the existing reviewsf
const GetComplaints = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await Complaint.find({ studentId: id })
      .populate(`studentId`, `name studentClass division`)
      .populate(`teacherId`, `name subject division class`);
    // console.log(response)
    if (response) {
      res.status(200).json({ msg: "succesfull", complaints: response });
    } else {
      res.status(500).json({ msg: "Complaints Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

//student controller for finding all the existing reviews
const GetExams = async (req, res) => {
  console.log(req.user.id)
  const {id} = req.user
  try {
    const student = await Student.findOne({_id:id})
    const response = await Exam.find({examClass:student.studentClass});
    console.log(response,'the response')
    if (response) {
      res.status(200).json({ msg: "succesfull", exams: response });
    } else {
      res.status(500).json({ msg: "Exam Not Found" });
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
    const existingStudent = await Student.findOne({ _id: id });
    if (existingStudent) {
      const response = await Leave.findOneAndUpdate(
        { studentId: id, startDate, endDate },
        { reason: leaveReason, user: role },
        options
      );
      if(response){
        res.status(200).json({msg:"succesfull",leaves:response})
      }else{
        res.json({msg:"Leave not Created"})
      }
    } else {
      res.json({ msg: "Student not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};


/*controller function for finding all the existing leaves that 
student created and returing int he response
*/
const GetLeaves = async (req, res) => {
  console.log("entered in the student Leaves findinfg  function for the teracher");
  const {id} = req.user
  try {
    const existingLeaves = await Leave.find({studentId:id})
    if(existingLeaves){
      res.status(200).json({msg:"succesfull",leaves:existingLeaves})
    }else{
      res.json({msg:"Leave not found"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/* controller function for getting the current student for the 
profile component, the id for the searching is sended from the front End
as the parms
*/
const GetCurrentStudent = async( req,res)=>{
  console.log('entered in the current student finding function')
  const {id} = req.params
  try{
    const student = await Student.findOne({_id:id}).select("-password")
    console.log(student)
    if(student){
      res.status(200).json({msg:"succesfull",student:student})
    }else{
      res.json({msg:"Student not found"})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:error.message})
  }
}

/* controller function for updating the teacher info  for the profile component*/
const UpdateCurrentStudent = async( req,res)=>{
  const {id} = req.params
  const {name,email,phone,password} = req.body
  try{
    if(password){
      const hashedPassword = bcrypt.hash(password)
      var student = await Student.findOneAndUpdate({_id:id},{name,email,phone,password:hashedPassword},{new:true})
    }else{
      var student = await Student.findOneAndUpdate({_id:id},{name,email,phone},{new:true})
    }
    if(student){
      res.status(200).json({msg:"succesfull",student:student})
    }else{
      res.json({msg:"Student not Found"})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:error.message})
  }
}





module.exports = {
  // studentRegister,
  studentLogin,
  // sendNewMail,
  otpVerification,
  getStudentsAttandence,
  getStudentsAttandence,
  GetReviews,
  GetComplaints,
  GetExams,

  CreateLeave,
  GetLeaves,

  GetCurrentStudent,
  UpdateCurrentStudent
};
