import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name:"student",
    initialState:{
        token:"",
        user:null,
        id:null,
        email:null
    },
    reducers:{
        userLogin:(state,action)=>{
            state.token = action.payload
        },
        userLogOut:(state,action)=>{
            state.student = {
                token:"",
                user:null,
                id:null,
                email:null
            }
        }
    }
})

export const {userLogOut,userLogin} = studentSlice.actions;
export default studentSlice.reducer;