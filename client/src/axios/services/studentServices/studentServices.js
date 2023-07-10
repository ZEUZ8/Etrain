import { axiosStudentInstance } from "../../axios";

export const studentsRegister = async (value) =>{
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post("/register", value, config);
        return response.data
    }catch(error){
        console.log(error)
        console.log("erro at the student register services")
    }
}


export const studentLogin = async (value)=>{
    console.log(value)
    const config ={
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post("/login",value,config)
        return(response.data)
    }catch(error){
        // console.log("error at the student login services",error)
        return(error.response.data)
    }
}

//student service function for login the teacher withe the google
export const StudentGoogleLogin = async(email)=>{
    console.log(email,'the mail')
    try{
        const respons = await axiosStudentInstance.post("/googleLogin",{email})
        return respons.data
    }catch(error){
        console.log(error)
        console.log("error at the student login services At fronEnd")
        return(error)
    }
}

export const otpVerification = async (value,user,id)=>{
    console.log(value,"consoling the serivces")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post(`/verify/${id}`,value,config)
        return response.data
    }catch(error){
        console.log(`Erro at the student Otp verify services --> ${error}`)
        return(error.message)
    }
}

export const GetAttandence = async (token)=>{
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get("/attandence",config)
        return response.data
    }catch(error){
        console.log(error)
        return({msg:error.response.data})
    }
}

//stuent service function for getting all the existing Reviews
export const GetReviews = async(token)=>{
    console.log("this is the reviews finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respone = await axiosStudentInstance.get("/reviews",config)
        return respone.data
    }catch(error){
        console.log(error)
        return({msg:error.message})
    }
}



//stuent service function for getting all the existing Exams
export const GetComplaints = async(token)=>{
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respone = await axiosStudentInstance.get("/complaints",config)
        return respone.data
    }catch(error){
        console.log(error)
        return({msg:error.message})
    }
}



//stuent service function for getting all the existing Exams
export const GetExams = async(token,id)=>{
    console.log("this is the exam finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respone = await axiosStudentInstance.get(`/exams`,config)
        return respone.data
    }catch(error){
        console.log(error)
        return({msg:error.message})
    }
}
        

//function for creating a new leave form for the teacehr 
export const CreateStudentLeave = async(token,values)=>{
    console.log("entered in the leaveforms creating service function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post("/leave",values,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


//function for getting all the leave forms that teacher created 
export const GetStudentLeaves = async(token)=>{
    console.log("entered in the leaveforms finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get("/leave",config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}



/* student services function for find the current student for the
profile component
*/
export const GetStudent = async(token,id)=>{
    console.log("entered in current student finding section")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get(`/student/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* service function for updating the user data name,phone,emial,password here the user could update the 
password that getted by the mail
*/
export const UpdateStudent = async(token,id,values)=>{
    console.log("entered in current student updating section")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.put(`/student/${id}`,values,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}




//teacher service function for getting all the existing Teachers
export const GetTeachers = async(token)=>{
    console.log("entred in the teachers finding funcion")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get("/teachers",config)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}




/* service function for creating converstation for teacher
*/
export const CreateStudentConversation = async(token,id,userId)=>{
    console.log("entered in conversation creating function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    const requestBody = {senderId:id,receiverId:userId}
    try{
        const response = await axiosStudentInstance.post(`/conversation`,requestBody,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}






/* service function for creating converstation for teacher
*/
export const GetStudentConversation = async(token,id)=>{
    console.log("entered in conversation finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get(`/conversation/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}



/* service function for creating messages for students
*/
export const CreateStudentMessages = async(token,value)=>{
    console.log("entered in messages  creating function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post(`/messages`,value,config)
        console.log(response,'   consoling in the service function')
        return(response.data)
    }catch(error){
        console.log(error,'consolin the error int he services')
        return(error.response.data)
    }
}


/* service function for getting Messgaes  for students
*/
export const GetStudentMessages = async(token,id)=>{
    console.log("entered in conversation finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get(`/messages/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}



/* service function for getting chat persons  for students
*/
export const StudentChatMember = async(token,id)=>{
    console.log("entered in conversation finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get(`/chatMember/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* service function for getting the students monthly attendence for graphical representation for students 
*/
export const GetMonthlyAttendance = async(token,id)=>{
    console.log("entered in monthlyAttendance finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.get(`/monthlyAttendance`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}







// router.post("/conversation",verifyStudent,CreateConversation)

// //new conversation
// router.get("/conversation/:userId",verifyStudent,GetConversation)

// //add mesages
// router.post('/messages',verifyStudent,CreateMessages)

// //get messages
// router.get("/messages/:conversationId",verifyStudent,GetMessages)