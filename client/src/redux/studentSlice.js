import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name:"student",
    initialState:{
        token:"",
        user:null
    },
    reducers:{
        userLogin:(state,action)=>{
            state.user = action.payload
        },
        userLogOut:(state,action)=>{
            state.user = {
                token:"",
                user:null
            }
        }
    }
})

export const {userLogOut,userLogin} = userSlice.action;
export default userSlice.reducer;