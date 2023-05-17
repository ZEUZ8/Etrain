import React from "react"
import {Routes,Route} from "react-router-dom"

import Home from "../components/landing/home/Home"
import SignUp  from "../components/students/signUp/SignUp"
import Login from "../components/students/login/login"

function StudentRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={< Home />}></Route>
                <Route path="/signup" element={< SignUp />}></Route>
                <Route path="/login" element={< Login />}></Route>
            </Routes>
        </div>
    )
}

export default StudentRoutes