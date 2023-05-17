import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import StudentRoutes from './routes/studentRoute'

import "./App.css"


const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/*' element={< StudentRoutes />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
