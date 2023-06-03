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
    console.log("entered in the attandence marking function ")
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

