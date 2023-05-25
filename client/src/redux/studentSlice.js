import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name:"student",
    initialState:{
        token:"",
        user:null,
        id:null,
    },
    reducers:{
        userLogin:(state,action)=>{
            state.student = action.payload
        },
        userLogOut:(state)=>{
            state.student = {
                token:"",
                user:null,
                id:null,
            }
        }
    }
})

export const {userLogOut,userLogin} = studentSlice.actions;
export default studentSlice.reducer;