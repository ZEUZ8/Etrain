import { axiosPrincipalInstance } from "../../axios";



//principal service function for login 
export const principalLoginService = async(value)=>{
    // console.log("principal login service at / fronEdn / serveces")
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    try{
        const respons = await axiosPrincipalInstance.post("/login",value,config)
        return respons.data
    }catch(error){
        console.log(error,"  error at the principal login services frond End")
        return error
    }
}

//principal services function for creating a new calss
export const classCreation = async (token,value) =>{
    // console.log(value,"enterd the class createiion services ")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosPrincipalInstance.post("/createClass", value, config);
        return response.data
    }catch(error){
        console.log(error.response.data)
        console.log("erro at the principal new class creation")
        return error
    }
}

//principal services function for finding all the classes
export const classes = async (token)=>{
    // console.log("entered in the class finding function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respons = await axiosPrincipalInstance.get("/classes",config)
        return respons.data
    }catch(error){
        console.log(error.response.data)
        console.log("error occured at the principal class getting services")
        return error.response.data
    }
}

//principla service function for finding all the teachers
export const teachers  = async (token)=>{
    console.log(token,"condoling for kiran")
    // console.log("entered in the teachers finding service function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respons = await axiosPrincipalInstance.get("/teachers",config)
        return(respons.data)
    }catch(error){
        console.log("error occured in the principal teachers finding services")
        console.log(error)
        return(error.response.data)
    }
}

//principal teachers editig functions services goes  here
export const updateTeacher  = async (token,formData)=>{
    console.log("entered in the teachers updating service function")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const respons = await axiosPrincipalInstance.put("/teachers",formData,config)
        return(respons.data)
    }catch(error){
        console.log("error occured in the principal teachers updating services")
        console.log(error)
        return(error.response.data)
    }
}


//principal exam creation function services goes here
export const CreateExam = async(token,value)=>{
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosPrincipalInstance.post('/exam',value,config)
        return(response.data)
    }catch(error){
        console.log("error occured in the principal exam creating services",error)
        return(error.response.data)
    }
}

//principal services function for finding all the exams goes here
export const GetExam = async(token)=>{
    console.log("entered in the exam getting principal services")
    const config = {
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosPrincipalInstance.get('/exam',config)
        return(response.data)
    }catch(error){
        console.log("eroro occured at the principal exam finding services",error)
    }
}

// export const principalOtpVerification = async (value,user,id)=>{
//     console.log(value,"consoling the serivces")
//     const config = {
//         headers:{
//             "Content-Type":"application/json"
//         },
//     };
//     try{
//         const response = await axiosPrincipalInstance.post(`/verify/${id}`,value,config)
//         return response.data
//     }catch(error){
//         console.log(`Erro at the student Otp verify services --> ${error}`)
//         return(error.message)
//     }
// }