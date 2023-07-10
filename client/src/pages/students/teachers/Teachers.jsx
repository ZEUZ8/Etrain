import React from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import SideBar from '../../../components/landing/sideBar/SideBar'
import StudentTeachers from '../../../components/students/Teachers/StudentTeachers'

const Teachers = () => {
  return (
    <div>
      <Navbar/>
      <SideBar/>
      <StudentTeachers/>
    </div>
  )
}

export default Teachers
