import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import SignUp from "../components/students/signUp/SignUp";
import Otp from "../components/landing/otpVerification/Otp"
import Attendence from "../components/students/attendence/Attendence"

import StudentProfile from "../pages/students/profile/StudentProfile";
import StudentLogin from "../pages/students/login/studentLoginPage"
import StudentTimeTable from "../pages/students/timeTable/StudentTimeTable";

function StudentRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                <Route path="/signup" element={< SignUp />}></Route>
                <Route path="/login" element={< StudentLogin />}></Route>
                <Route path="/otp" element={< Otp />}></Route>
                <Route path="/profile" element={< StudentProfile />}></Route>
                <Route path="/attendence" element={< Attendence />}></Route>
                <Route path="/timetable" element={< StudentTimeTable />}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes