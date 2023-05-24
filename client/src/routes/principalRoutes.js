import React from "react";
import { Route,Routes } from "react-router-dom";

import PrincipalDashBoard from "../pages/principal/principalDashBoard/PrincipalDashBoard"
import PrincipalClass from '../pages/principal/Class/principalClasses'


const PrincipalRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<PrincipalDashBoard/>}></Route>
            <Route path="/class" element={< PrincipalClass/>}></Route>
        </Routes>
    </div>
  )
}

export default PrincipalRoutes
