import React from "react"
import {Routes,Route} from "react-router-dom"

import Login from "../pages/students/login/studentLoginPage"
import TeacherSignUpPage from "../pages/teachers/signUp/TeacherSignUpPage";
import DashBoard from "../pages/teachers/dashBoard/TeacherDashBoard"
import TeacherWeeklyTasksPage from "../pages/teachers/weeklyTasks/TeacherWeeklyTasksPage";
import TeacherAttadencePage from "../pages/teachers/attandence/TeacherAttadencePage";
import TeacherComplaintsPage from "../pages/teachers/complaints/TeacherComplaintsPage";
import TeacherStudentsPage from "../pages/teachers/students/TeacherStudentsPage";
import TeacherExamPage from "../pages/teachers/exams/TeacherExamPage";
import LeaveFormPage from "../pages/common/leaveForm/LeaveFormPage";
import ChatPage from "../pages/common/Chat/ChatPage";

function TeacherRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< DashBoard user="teacher" />}></Route>
                {/* <Route path="/register" element={< TeacherSignUpPage />}></Route> */}
                <Route path="/login" element={< Login userType="teacher"/>}></Route>
                <Route path="/weeklyTasks" element={< TeacherWeeklyTasksPage />}></Route>
                <Route path="/attandence" element={< TeacherAttadencePage />}></Route>
                <Route path="/reviews" element={< TeacherComplaintsPage page="review" />}></Route>
                <Route path="/complaints" element={< TeacherComplaintsPage page="complaint"/>}></Route>
                <Route path="/students" element={< TeacherStudentsPage />}></Route>
                <Route path="/exams" element={< TeacherExamPage />}></Route>
                <Route path="/leave" element={< LeaveFormPage user="teacher" />}></Route>
                <Route path="/chat" element={< ChatPage user="teacher" />}></Route>
            </Routes>
        </div>
    )
}

export default TeacherRoutes