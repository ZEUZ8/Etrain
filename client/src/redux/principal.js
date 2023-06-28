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
            state.token = action.payload.token
            state.user = action.payload.user
            state.id = action.payload.id
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