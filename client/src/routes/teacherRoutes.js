import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import Login from "../components/teachers/login/Login";
import TeacherSignUpPage from "../pages/teachers/signUp/TeacherSignUpPage";

function TeacherRoutes(){
    return (
        <div>
            <Routes>
                {console.log("insn")}
                <Route path="/" element={< Home />}></Route>
                <Route path="/login" element={< Login />}></Route>
                <Route path="/register" element={< TeacherSignUpPage />}></Route>
                <Route path="/profile" element={< TeacherSignUpPage />}></Route>
            </Routes>
        </div>
    )
}

export default TeacherRoutes