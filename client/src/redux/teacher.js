import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name:"teacher",
    initialState:{
        token:null,
        user:null,
        id:null
    },
    reducers:{
        teacherLogin:(state,action)=>{
            state.token = action.payload.token
            state.user = action.payload.user
            state.id = action.payload.id
        },
        teacherLogout:(state)=>{
            state.token = null;
            state.user = null;
            state.id = null;
        }
    }

})

export const {teacherLogin,teacherLogout} = teacherSlice.actions
export default teacherSlice.reducer
