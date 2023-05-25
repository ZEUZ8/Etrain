const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const { sendNewMail } = require("./studentsController");
const Teacher = require("../models/teacher");
const OTP = require("../models/Otp")

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
      res
        .status(200)
        .json({
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

const otpVerification = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    try {
      //checking that otp sended user have added to the OTP collection if not, then the verifacation mail has not sended to the user
      const checking = await OTP.findOne({ userId: id });
      console.log(otp, checking.otp);
      const verifacationOtp = await bcrypt.compare(otp, checking.otp);
      console.log(verifacationOtp);
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
          res
            .status(200)
            .json({
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

module.exports = {
  teacherRegister,
  otpVerification,
};
