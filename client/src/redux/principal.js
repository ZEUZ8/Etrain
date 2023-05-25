import { createSlice } from "@reduxjs/toolkit";

const principalSlice = createSlice({
    name:"principal",
    initialState:{
        token:null,
        user:null,
        id:null
    },
    reducers:{
        principalLogin:(state,action)=>{
            state.principal = action.payload
        },
        principalLogout:(state)=>{
            state.principal = {
                token:null,
                user:null,
                id:null
            }
        }
    }
})

export const {principalLogin,principalLogout} = principalSlice.actions;
export default principalSlice.reducer;