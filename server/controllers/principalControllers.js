const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const Class = require("../models/Class");
const Teacher = require("../models/teacher")

const classCreation = async (req, res) => {
  const { className, division, classTeacher, maxStudents } = req.body;
  try {
    const existingClass = await Class.findOne({
      className: className,
      division: division,
    });
    if (existingClass) {
      res.json({ msg: "class Already Added" });
    } else {
      const respons = await Class.create({
        className,
        division,
        classTeacher,
        maxStudents,
      });
      if (respons) {
        res.status(200).json({ msg: "created" });
      } else {
        console.log("entered in the else case of the class creatioin respons");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "calss not created" });
  }
};

const getClasses = async (req, res) => {
  console.log(
    "entered at the class getting funcion AT backen,principla controllers "
  );
  try {
    const existingClass = await Class.find({});
    if (existingClass) {
      console.log(existingClass);
      res.status(200).json({ msg: "success", classes: existingClass });
    } else {
      res.status(500).json({ msg: "Class not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"Error at the Class finding"})
  }
};

const getTeachers = async (req, res) => {
  console.log(
    "entered at the teachers finding function at backend principal controllers"
  );
  try{
    const existingTeachers = await Teacher.find({})
    if(existingTeachers){
        console.log(existingTeachers)
        res.status(200).json({teachers:existingTeachers})
    }else{
        console.log("Teachers dont existing")
        res.status(500).json({msg:"Teachers don't exist"})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:"Error at finding Teachers"})
  }
};

// const otpVerification = async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
//     try {
//       //checking that otp sended user have added to the OTP collection if not, then the verifacation mail has not sended to the user
//       const checking = await OTP.findOne({ userId: id });
//       console.log(otp, checking.otp);
//       const verifacationOtp = await bcrypt.compare(otp, checking.otp);
//       console.log(verifacationOtp);
//       if (verifacationOtp) {
//         //checking, the finded user id is existing the user collection and the otp is right
//         const change = await Teacher.findOneAndUpdate(
//           { _id: id },
//           { ververification: true }
//         );
//         if (change) {
//           const Token = jwt.sign(
//             {
//               name: change.name,
//               email: change.email,
//               id: change._id,
//               role: "teacher",
//             },
//             "TeacherTokenSecret",
//             { expiresIn: "2d" }
//           );
//           res
//             .status(200)
//             .json({
//               msg: "verified",
//               user: "teacher",
//               id: change._id,
//               email: change.email,
//               token: Token,
//             });
//         }
//       } else {
//         console.log("otp not match");
//         res.status(500).json({ msg: "Not Verified" });
//       }
//     } catch (error) {
//       console.log(`error at the otp verification teacher--> ${error}`);
//     }
// };

module.exports = {
  classCreation,
  getClasses,
  getTeachers,
};
