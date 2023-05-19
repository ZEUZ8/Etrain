import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import SignUp from "../components/students/signUp/SignUp";
import Login from "../components/students/login/login";
import Otp from "../components/landing/otpVerification/Otp";

function StudentRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                <Route path="/signup" element={< SignUp />}></Route>
                <Route path="/login" element={< Login />}></Route>
                <Route path="/otp" element={< Otp />}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes