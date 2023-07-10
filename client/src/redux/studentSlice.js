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
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.id = action.payload.id;
        },
        userLogOut:(state)=>{
            state.token = "";
            state.user = null;
            state.id = null;
        }
    }
})

export const {userLogOut,userLogin} = studentSlice.actions;
export default studentSlice.reducer;