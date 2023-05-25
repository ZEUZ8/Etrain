import React from "react";
import { Route,Routes } from "react-router-dom";

import PrincipalDashBoard from "../pages/principal/principalDashBoard/PrincipalDashBoard"
import PrincipalClass from '../pages/principal/Class/principalClasses';
import PrincipalTeachersPage from "../pages/principal/teachers/PrincipalTeachersPage";


const PrincipalRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<PrincipalDashBoard/>}></Route>
            <Route path="/class" element={< PrincipalClass/>}></Route>
            <Route path="/teachers" element={< PrincipalTeachersPage />}></Route>
        </Routes>
    </div>
  )
}

export default PrincipalRoutes
