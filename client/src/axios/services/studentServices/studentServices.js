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
        return response.data

    }catch(error){
        console.log(error)
        console.log("error at the student login services")
    }
}

export const otpVerification = async (value)=>{
    console.log(value)
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosStudentInstance.post("/verify",value,config)
        return response.data
    }catch(error){
        console.log(`Erro at the student Otp verify services --> ${error}`)
    }
}