import React from 'react'
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import "./App.css"

import StudentRoutes from './routes/studentRoute'
import TeacherRoutes from './routes/teacherRoutes'
import PrincipalRoutes from "./routes/principalRoutes"
 

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/*' element={< StudentRoutes />}></Route>
          <Route path='/teacher/*' element={< TeacherRoutes />}></Route>
          <Route path='/principal/*' element={< PrincipalRoutes />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

