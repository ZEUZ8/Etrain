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
        return error
    }
}

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


// export const classes = async ()=>{
//     console.log("entered in the class finding function")
//     const config = {
//         headers:{
//             "Content-Type":"application/json"
//         },
//     };
//     try{
//         const respons = await axiosPrincipalInstance.get("/classes")
//         return respons.data
//     }catch(error){
//         console.log(error)
//         console.log("error occured at the principal class getting services")
//         return error
//     }
// }