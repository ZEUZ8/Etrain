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