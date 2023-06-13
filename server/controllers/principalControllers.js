const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const Class = require("../models/Class");
const Teacher = require("../models/teacher")
const Admin = require("../models/admin");
const Exam = require("../models/exam");

//the config contian the password and the user for sending the mail
let config = {
  service: "gmail",
  auth: {
    user: "ptsinan8590@gmail.com",
    pass: "ccykjhaaejmqvsbl",
  },
};

//controller for the handling he principal login function
const principalLogin = async(req,res)=>{
  console.log("entered at the principal login controllers in the backend /controllers")
  try{
    const {email,password} = req.body;
    const chumma = Admin.find({})
    const principal = await Admin.findOne({email:email})
    if(!principal){
      res.json({msg:"Invalid Credentials"})
    }else{
        const checkedPassword = await bcrypt.compare(password,principal.password);
        if(!checkedPassword){
        }else{
          const token = jwt.sign(
            {
            name:principal.name,
            email:principal.email,
            id:principal.id,
            role:"principal"
            },
            "PrincipalTokenSecret",
            {expiresIn:"2d"}
          )
          res.status(200).json({msg:"login succesfull",token:token,user:"principal",id:principal._id,email:principal.email})
        }
    }

  }catch(error){
    console.log(error,"  error at the teacher controllers login")
    res.status(500).json({msg:"error at teacher login"})
  }
}

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
        res.status(200).json({ msg: "created",respons });
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
      res.status(200).json({ msg: "success", classes: existingClass });
    } else {
      res.json({ msg: "Class not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"Error at the Class finding"})
  }
};

//controller function for getting all the existing teacher 
const getTeachers = async (req, res) => {
  console.log(
    "entered at the teachers finding function at backend principal controllers"
  );
  try{
    const existingTeachers = await Teacher.find({})
    if(existingTeachers && existingTeachers.length > 0){
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

//controller function for updating the teacher 
const updateTeachers = async (req,res)=>{
  try{
    const {className,division,teacherId} = req.body
    const existingClass = await Class.findOne({className:className,division:division})
    if(existingClass){
      const teacher = await Teacher.findOneAndUpdate({_id:teacherId},{class:existingClass.className,division:existingClass.division})
      if(teacher){
        res.status(200).json({msg:"updation successfull",teacher:teacher})
      }else{
        res.status(500).json({msg:"updation failed"})
      }
    }else{
      res.status(500).json({msg:"class not found"})
    }
  }catch(error){
    res.status(500).json({msg:"Erro! Teacher Updation"})
  }
}

//controller function for creating new Exam 
const createExam = async(req,res)=>{
  console.log("entered in the exam creating function")
  try{
    const {examName,startDate,endDate,examDiscription,timeTable} = req.body
    const existingExam = await Exam.findOne({examName:examName})
    if(!existingExam){
      const response = await Exam.create({examName:examName,startDate:startDate,endDate:endDate,examDiscription:examDiscription,timeTable})
      if(response){
        res.status(200).json({msg:"Exam created",exam:response})
      }else{
        res.status(500).json({msg:"Exam not created"})
      }
    }else{
      res.status(500).json({msg:"exam alredy added"})
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:error.message})
  }
}

/*controller fucntion for the principal to find all the existing exam and return them 
in this controller the req is already verified so the after that finding all the exam in the exam collection and returning 
all of them
*/
const GetExam = async(req,res)=>{
  console.log("enterd in the exam getting function ")
  try{
    const response = await Exam.find({})
    if(response){
      console.log(response)
      res.status(200).json({msg:"success",exams:response})
    }else{
      console.log(response)
      res.status(500).json({msg:"Couldn't find Exams"})
    }
  }catch(error){
    res.status(500).json({msg:error.message})
  }
}

{/*                                   Add a New Teacher 
Controller function for addin a new teacher in the teacher collection with 
specified email and the OTP created by the sendMail fucntion and it will be the teacher pass word and 
teacher can updat it late as she/he likes */}
const addNewTeacher = async (req,res)=>{
  console.log(req.body)
  console.log("entered in the controller function for adding new taacher")
  try{
    const {teacherName,teacherSubject,teacherEmail} = req.body
    const existingTeacher = await Teacher.findOne({name:teacherName,email:teacherEmail})
    if(existingTeacher){
      res.json({msg:"Teacher already Added"})
    }else{
      const sendedMail  = await sendNewMail()
      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(sendedMail.otp.toString(), saltRounds);
      const result = await Teacher.create({password:hashedOTP,name:teacherName,email:teacherEmail,subject:teacherSubject})
      console.log("all the function where completed",result)
      if(result){
        res.status(200).json({msg:"succesfull",teacher:result})
      }else{
        res.status(500).json({msg:"Teacher Not Created"})
      }
    }
  }catch(error){
    console.log(error)
    res.status(500).json({msg:error.message})
  }
}


{/*                                   Send Mail 
controller function for creating a new otp and sending that to the specified mail 
through this we can ensure that the provided mail is valid and the teacher can sign up wiht the otp that 
we send and lter on the teacher can eidt the passsword asswell as the teacher data
*/}
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
          resolve({info,otp});
        }
      });
    });
  } catch (error) {
    console.log("Error Occurred:", error);
    return error.message;
  }
};


module.exports = {
  principalLogin,
  classCreation,
  getClasses,
  getTeachers,
  updateTeachers,
  createExam,
  GetExam,
  addNewTeacher
};
