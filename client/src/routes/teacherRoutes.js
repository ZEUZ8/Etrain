import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import Login from "../pages/students/login/studentLoginPage"
import TeacherSignUpPage from "../pages/teachers/signUp/TeacherSignUpPage";
import DashBoard from "../pages/teachers/dashBoard/TeacherDashBoard"
import TeacherWeeklyTasksPage from "../pages/teachers/weeklyTasks/TeacherWeeklyTasksPage";
import TeacherAttadencePage from "../pages/teachers/attandence/TeacherAttadencePage";

function TeacherRoutes(){
    return (
        <div>
            <Routes>
                {console.log("insn")}
                <Route path="/" element={< DashBoard />}></Route>
                <Route path="/register" element={< TeacherSignUpPage />}></Route>
                <Route path="/login" element={< Login userType="teacher"/>}></Route>
                <Route path="/weeklyTasks" element={< TeacherWeeklyTasksPage />}></Route>
                <Route path="/attandence" element={< TeacherAttadencePage />}></Route>
            </Routes>
        </div>
    )
}

export default TeacherRoutes