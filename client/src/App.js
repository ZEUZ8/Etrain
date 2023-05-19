import React from 'react'
import { Route,Routes } from 'react-router-dom'

import StudentRoutes from './routes/studentRoute'

import "./App.css"


const App = () => {
  return (
      <main>
        <Routes>
          <Route path='/*' element={< StudentRoutes />}></Route>
        </Routes>
      </main>
  )
}

export default App

