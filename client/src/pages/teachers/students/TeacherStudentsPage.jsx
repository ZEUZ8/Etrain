import React from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import TeacherStudennbts from "../../../components/teachers/students/TeacherStudents"

const TeacherStudentsPage = () => {
  return (
    <div>
        <Navbar/>
        <TeacherSideBar/>
        <TeacherStudennbts/>
    </div>
  )
}

export default TeacherStudentsPage



