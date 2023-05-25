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
            state.teacher = action.payload
        },
        teacherLogout:(state)=>{
            state.teacher={
                token:null,
                user:null,
                id:null
            }
        }
    }
})

export const {teacherLogin,teacherLogout} = teacherSlice.actions
export default teacherSlice.reducer
