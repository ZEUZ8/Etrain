import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persit/lib/storage';
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import studentReducer from "../redux/studentSlice"


const persistConfig = {key:'root',storage,version:1}

const reducer =  combineReducers({
        studentReducer
    })


const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer
})