import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import SignUp from "../components/students/signUp/SignUp";
import Attendence from "../components/students/attendence/Attendence"

import OTPverification from "../pages/common/otpVerification/OTPverification";
import StudentProfile from "../pages/students/profile/StudentProfile";
import Login from "../pages/students/login/studentLoginPage"
import StudentTimeTable from "../pages/students/timeTable/StudentTimeTable";
import DataShowcasePage from "../pages/students/DataShowcase/DataShowcasePage";
import LeaveFormPage from "../pages/common/leaveForm/LeaveFormPage";

function StudentRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                {/* <Route path="/signup" element={< SignUp />}></Route> */}
                <Route path="/login" element={< Login userType="student" />}></Route>
                {/* <Route path="/otp" element={< OTPverification />}></Route> */}
                <Route path="/profile" element={< StudentProfile user="student" />}></Route>
                <Route path="/attendence" element={< Attendence />}></Route>
                <Route path="/timetable" element={< StudentTimeTable />}></Route>
                <Route path="/exams" element={< DataShowcasePage page="exams"/>}></Route>
                <Route path="/complaints" element={< DataShowcasePage page="complaints"/>}></Route>
                <Route path="/reviews" element={< DataShowcasePage page="reviews"/>}></Route>
                <Route path="/leave" element={<LeaveFormPage user="student"/>}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes