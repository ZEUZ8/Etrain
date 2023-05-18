const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const nodeMailer = require("nodemailer")

const Student = require("../models/students")

const studentRegister = async (req,res) => {
    console.log("Controllers,Backend,studentLogin")
    const {name,phone,email,password,studentClass,division} = req.body
    try{
        const hashedPassword = await bcrypt.hash(password,12)
        const result = await Student.create({
            name,
            phone,
            email,
            studentClass,
            division,
            password:hashedPassword
        })
        const mail = await sendNewMail(result)
        if(mail){
            const token = jwt.sign(
                {name:result.name,email:result.email,id:result._id,role:"student"},
                "StudentTokenSecret",
                {expiresIn:"2d"}
            )
            res.status(200).json({token:token,msg:"Account Created", user:"student"})
        }else{
            res.json({msg:"Verification Mail Sended"})
        }
        
    }catch(error){
        res.status(500).json({msg:`somthing went wrong`})
        console.log(`error at the student signUp, backen controllers --> ${error.message}`)
    }
}


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
const studentLogin = async (req,res)=>{
    console.log("Controllers,Backend,studentLogin")
    try{
        const {email,password} = req.body
        const existStudent = await Student.findOne({email:email});

        if(!existStudent){
            res.json({msg:"student don't exists"})
        }

        if(existStudent.verification === "not verified"){
            console.log("verifaction mail should send to the user")
        }else{
            const checkedPassword = await bcrypt.compare(password,existStudent.password)

            if(!checkedPassword){
                res.json({msg : "Invalid Credentials"})
            }

            const token = jwt.sign(
                {name:existStudent.name,email:existStudent.email,id:existStudent._id,role:"student"},
                "StudentTokenSecret",
                {expiresIn:"2d"}
            )
            res.status(200).json({token:token,msg:"login succesfull", user:"student"})
        }
    }catch(error){
        res.status(500).json({msg:`error at student login`})
        console.log(`error at the student login,controller,backend --> ${error.message}`)
    }
}

const sendNewMail = (student)=>{
    console.log("entered to the mail sending functioin")

    const transporter = nodeMailer.createTransport({
        service:"Gmail",
        auth:{
            user:"ptsinan8590@gmail.com",
            pass:"Sinan@123"
        }
    })

    const mailOptions ={
        from:"ptsinan8590@gmail.com",
        to:"ptsinan8590@gmail.com",
        subject:"Account Verifaction",
        html:`
            <h1>Verify Your Email</h1>
            <p>Please click the following link to verify your account:</p>
            <a href="http://your-app.com/verify/${student.phone}">Verify Email</a>
      `,
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log("Error Occured :",error)
        }else{
            console.log("Email sent : ",info.response)
            return info.response
        }
    })


    
}

module.exports={
    studentRegister,
    studentLogin,
    sendNewMail
}