import { axiosPrincipalInstance } from "../../axios";



export const classCreation = async (value) =>{
    console.log(value,"enterd the class createiion services ")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const response = await axiosPrincipalInstance.post("/createClass", value, config);
        return response.data
    }catch(error){
        console.log(error)
        console.log("erro at the principal new class creation")
        return error
    }
}

export const classes = async ()=>{
    console.log("entered in the class finding function")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const respons = await axiosPrincipalInstance.get("/classes")
        return respons.data
    }catch(error){
        console.log(error)
        console.log("error occured at the principal class getting services")
        return error
    }
}

export const teachers  = async ()=>{
    console.log("entered in the teachers finding service function")
    const config = {
        headers:{
            "Content-Type":"application/json"
        },
    };
    try{
        const respons = await axiosPrincipalInstance.get("/teachers")
        return(respons.data)
    }catch(error){
        console.log("error occured in the principal teachers finding services")
        console.log(error)
        return(error)
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