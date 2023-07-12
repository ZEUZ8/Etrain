import {axiosTeacherInstance } from "../../axios";



// export const teacherRegister = async (value) =>{
//     console.log(value,"enterd the class createiion services ")
//     const config = {
//         headers:{
//             "Content-Type":"application/json"
//         },
//     };
//     try{
//         const response = await axiosTeacherInstance.post("/register", value, config);
//         return response.data
//     }catch(error){
//         console.log(error)
//         console.log("erro at the teacher signup, At teacher Services")
//         return(error)
//     }
// }

//teacher services for the login Routes 
export const teacherLoginService = async(value)=>{
    console.log("teacher login services")
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try{
        const respons = await axiosTeacherInstance.post("/login",value,config)
        return respons.data
    }catch(error){
        console.log(error)
        console.log("error at the teacher login services At fronEnd")
        return(error)
    }
}

//teacher service function for login the teacher withe the google
export const TeacherGoogleLogin = async(email)=>{
    try{
        const respons = await axiosTeacherInstance.post("/googleLogin",{email})
        return respons.data
    }catch(error){
        console.log(error)
        console.log("error at the teacher login services At fronEnd")
        return(error)
    }
}

//teacher services for the otp verification in the teacher section
export const teacherOtpVerification = async (value,user,id)=>{
    console.log(value,"consoling the serivces")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post(`/verify/${id}`,value,config)
        return response.data
    }catch(error){
        console.log(`Erro at the teacher Otp verify services --> ${error}`)
        return(error.message)
    }
}

//teacher services for creating a weeekly task
export const weeklyTasks = async (token,value)=>{
    console.log(value,"consoling the serivces")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.put(`/weeklyTask`,value,config)
        return response.data
    }catch(error){
        console.log(`Erro at the teacher weeklyTask create services --> ${error}`)
        return(error.response.data)
    }
}

export const GetWeeklyTasks = async(token)=>{
    console.log("enterd in the weelytasks finding teacher servieces")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/weeklyTask",config)
        return response.data
    }catch(error){
        return(error.response.data)
    }
}

//teacher service function fro creating new student in the class 
export const addStudent = async(token,value)=>{
    console.log("entred in the students adding  funcion")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.put("/students",value,config)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

//teacher service function for getting all the students existing in the class
export const GetStudents = async(token)=>{
    console.log("entred in the students finding funcion")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/students",config)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

export const MarkAttandence = async(token,marking)=>{
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post("/attandence",marking,config)
        return response.data
    }catch(error){
        console.log(error)
        return({msg:error.response.data})
    }
}

//service function for gett all the existing exams for the teacher 
export const GetExams = async(token)=>{
    console.log("entred in the exams finding function for teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/exams",config)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* function for the teacher to create exam mark updating document if not exists then 
create one and return it
*/
export const CreateExamMark = async(token,formData)=>{
    console.log("entred in the exams Marks updating function for teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.put("/marks",formData,config)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

//function for the teahers to find all the existing edited marks of the exams 
export const GetMarks = async(token,studentId,exmaId)=>{
    console.log("entred in the exams Marks updating function for teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/marks/${studentId}/${exmaId}`,config)
        console.log(response)
        return response.data
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

// all the complaint section code goes here

        //creating a new complaint on the student 
        export const makeComplaint = async(value,token)=>{
            console.log(token,value , "  consooing fo rhe alsdfkl")
            console.log("entered in the complaint making services ")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.post("/complaint",value,config)
                return response.data
            }catch(error){
                console.log(error)
                return(error.response.data)
            }
        }

        //getting all the complaints that have created for the useEffect function to show in page mounting
        export const GetComplaints = async(token)=>{
            console.log("enterd inthe sutdent comaplaint getting services")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.get("/complaint",config)
                return response.data
            }catch(error){
                console.log(error)
                return(error.response.data)
            }
        }

        //teacher services for editing and updating the existing complaint 
        export const EditComplaint = async(value,token)=>{
            console.log("entered in the complaint edit function")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.put("/complaint",value,config)
                return(response.data)
            }catch(error){
                console.log(error)
                return(error.response.data)
            }
        }

        



//all the review section services goes here 

        //creating a new Review on the student 
        export const makeReview = async(value,token)=>{
            console.log(token,value , "  sinana's ideaf ont fialed")
            console.log("entered in the review making services ")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.post("/review",value,config)
                return response.data
            }catch(error){
                console.log(error)
                return(error.response.data)
            }
        }

        //getting all the Reviews that have created for the useEffect function to show in page mounting
        export const GetReviews = async(token)=>{
            console.log("enterd inthe sutdent comaplaint getting services")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.get("/review",config)
                return response.data
            }catch(error){
                console.log(error)
                return(error.response.data)
            }

        }

        //teacher services for editing and updating the existing Review 
        export const EditReviews = async(value,token)=>{
            console.log("entered in the complaint edit function")
            const config = {
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            };
            try{
                const response = await axiosTeacherInstance.put("/review",value,config)
                return(response.data)
            }catch(error){
                console.log(error)
                return(error.response.data)
            }
        }

//function for creating a new leave form for the teacehr 
export const CreateTeacherLeave = async(token,values)=>{
    console.log("entered in the leaveforms creating service function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post("/leave",values,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


        
//function for getting all the leave forms that teacher created 
export const GetTeacherLeaves = async(token)=>{
    console.log("entered in the leaveforms finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/leave",config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* teacher services function for find the current teacher for the
profile component
*/
export const GetTeacher = async(token,id)=>{
    console.log("entered in current teacher finding section")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/teacher/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* service function for updating the user data name,phone,emial,password here the user could update the 
password that getted by the mail
*/
export const UpdateTeacher = async(token,id,values)=>{
    console.log("entered in current teacher updating section")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.put(`/teacher/${id}`,values,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* service function for creating converstation for teacher
*/
export const CreateTeacherConversation = async(token,id,userId)=>{
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
        const response = await axiosTeacherInstance.post(`/conversation`,requestBody,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}




/* service function for creating converstation for teacher
*/
export const GetTeacherConversation = async(token,id)=>{
    console.log("entered in conversation finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/conversation/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}


/* service function for creating messages for teacher
*/
export const CreateTeacherMessages = async(token,value)=>{
    console.log("entered in messages  creating function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post(`/messages`,value,config)
        console.log(response,'   consoling in the service function')
        return(response.data)
    }catch(error){
        console.log(error,'consolin the error int he services')
        return(error.response.data)
    }
}



/* service function for getting Messgaes  for teachers
*/
export const GetTeacherMessages = async(token,id)=>{
    console.log("entered in conversation finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/messages/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* service function for getting chat persons  for principal
*/
export const TeacherChatMember = async(token,id)=>{
    console.log("entered in chat member finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/chatMember/${id}`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* service function for getting the students monthly attendence for graphical representation for teacher 
*/
export const GetMonthlyAttendance = async(token)=>{
    console.log("entered in monthlyAttendance finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get(`/monthlyAttendance`,config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* service function for getting the students monthly attendence for graphical representation for teacher 
*/
export const GetAnnualAttendance = async(token)=>{
    console.log("entered in AnnualAttendance finding function in the teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/annualAttendance",config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* service function for getting the timeTable for the class  */
export const GetTimeTable = async(token)=>{
    console.log("entered in class timeTable finding function in the teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.get("/timeTable",config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}

/* service function for updating the timeTable for the class  */
export const updateTimeTable = async(token,image)=>{
    console.log(image ,' the imagesss')
    console.log("entered in class timeTable uploading function in the teacher")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post(`/timeTable`,{image},config)
        return(response.data)
    }catch(error){
        console.log(error)
        return(error.response.data)
    }
}










