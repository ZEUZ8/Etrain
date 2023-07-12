import React from "react";
import { Route,Routes } from "react-router-dom";

import PrincipalDashBoard from "../pages/principal/principalDashBoard/PrincipalDashBoard"
import PrincipalClass from '../pages/principal/Class/principalClasses';
import PrincipalTeachersPage from "../pages/principal/teachers/PrincipalTeachersPage";
import Login from "../pages/students/login/studentLoginPage"
import PrincipalExamPage from "../pages/principal/exam/PrincipalExamPage";
import PrincipalLeavepage from "../pages/principal/LeaveForm/PrincipalLeavepage";
import ChatPage from "../pages/common/Chat/ChatPage";
import PrincipalEditClassPage from "../pages/principal/Class/PrincipalEditClassPage";
import ErrorPage from "../pages/common/Error/ErrorPage";

const PrincipalRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login userType="principal"/>}></Route>
            <Route path="/" element={<PrincipalDashBoard user="principal"/>}></Route>
            <Route path="/class" element={< PrincipalClass/>}></Route>
            <Route path="/teachers" element={< PrincipalTeachersPage />}></Route>
            <Route path="/exams" element={< PrincipalExamPage />}></Route>
            <Route path="/leave" element={< PrincipalLeavepage />}></Route>
            <Route path="/chat" element={< ChatPage user="principal" />}></Route>
            <Route path="/editClass" element={< PrincipalEditClassPage />}></Route>
            <Route path="/chat" element={< ChatPage user="principal" />}></Route>
            <Route path="/*" element={< ErrorPage user="principal" />}></Route>
        </Routes>
    </div>
  )
}

export default PrincipalRoutes
