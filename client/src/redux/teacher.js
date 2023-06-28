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
