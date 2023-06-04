import { axiosTeacherInstance } from "../../axios";



export const teacherRegister = async (value) =>{
    console.log(value,"enterd the class createiion services ")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosTeacherInstance.post("/register", value, config);
        return response.data
    }catch(error){
        console.log(error)
        console.log("erro at the teacher signup, At teacher Services")
        return(error)
    }
}

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
        return(error.message)
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


