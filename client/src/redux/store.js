import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import studentReducer from "./studentSlice"
import principalReducer from "./principla"
import teacherReducer from "./teacher"


const persistConfig = {key:'root',storage,version:1}

const reducer =  combineReducers({
        studentReducer,
        principalReducer,
        teacherReducer
    })


const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer
})