import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/home"
import Attendence from "../components/students/attendence/Attendence"


import StudentProfile from "../pages/students/profile/StudentProfile";
import Login from "../pages/students/login/studentLoginPage"
import StudentTimeTable from "../pages/students/timeTable/StudentTimeTable";
import DataShowcasePage from "../pages/students/DataShowcase/DataShowcasePage";
import LeaveFormPage from "../pages/common/leaveForm/LeaveFormPage";
import ChatPage from "../pages/common/Chat/ChatPage";
import Teachers from "../pages/students/teachers/Teachers";
import { useSelector } from "react-redux";

function StudentRoutes(){

    const studentData = useSelector(state => state.studentReducer)
    const token = studentData?.token
    const id = studentData?.id
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                {/* {token ? <Route path="/" element={<Home />} /> : <Route path="/login" element={<Login userType="student" />} />} */}
                <Route path="/login" element={< Login userType="student" />}></Route>
                <Route path="/profile" element={< StudentProfile user="student" />}></Route>
                <Route path="/attendence" element={< Attendence />}></Route>
                <Route path="/timetable" element={< StudentTimeTable />}></Route>
                <Route path="/exams" element={< DataShowcasePage page="exams"/>}></Route>
                <Route path="/complaints" element={< DataShowcasePage page="complaints"/>}></Route>
                <Route path="/reviews" element={< DataShowcasePage page="reviews"/>}></Route>
                <Route path="/leave" element={<LeaveFormPage user="student"/>}></Route>
                <Route path="/chat" element={<ChatPage user="student"/>}></Route>
                <Route path="/teachers" element={<Teachers user="student"/>}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes