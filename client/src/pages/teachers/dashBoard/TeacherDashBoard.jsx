import React from 'react'
import DashBoard from '../../../components/teachers/dashBoard/DashBoard'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'

const TeacherDashBoard = () => {
  return (
    <div>
        < Navbar/>
        < TeacherSideBar/>
        < DashBoard />
    </div>
  )
}

export default TeacherDashBoard
