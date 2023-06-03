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
        console.log(error,"er")
        console.log("error at the student login services")
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

    console.log("this is the attandefcn finding function")
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

