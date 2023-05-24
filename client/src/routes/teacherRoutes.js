import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home";
import Login from "../components/teachers/login/Login";


function TeacherRoutes(){
    return (
        <div>
            <Routes>
                {console.log("insn")}
                {/* <Route path="/" element={< Home />}></Route> */}
                <Route path="/" element={< Login />}></Route>
            </Routes>
        </div>
    )
}

export default TeacherRoutes