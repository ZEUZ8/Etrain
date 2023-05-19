import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import SignUp from "../components/students/signUp/SignUp";
import Login from "../components/students/login/login";
import Otp from "../components/landing/otpVerification/Otp";
import Attendence from "../components/students/attendence/Attendence"
import Profile from "../components/students/profile/Profile"
import TimeTable from "../components/students/timeTable/TimeTable";
function StudentRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                <Route path="/signup" element={< SignUp />}></Route>
                <Route path="/login" element={< Login />}></Route>
                <Route path="/otp" element={< Otp />}></Route>
                <Route path="/profile" element={< Profile />}></Route>
                <Route path="/attendence" element={< Attendence />}></Route>
                <Route path="/timetable" element={< TimeTable />}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes