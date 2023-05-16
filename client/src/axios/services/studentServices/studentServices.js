import { axiosStudentInstance } from "../../axios";

export const studentsRegister = async (value) =>{
    const config = {
        headers:{
            "Content-Type":"application/json,"
        },
    };
    try{
        const response = await axiosStudentInstance.post("/register",value,config);
        return response.data
    }catch{
        console.log(error)
        console.log("erro at the clietn register services")
    }
}