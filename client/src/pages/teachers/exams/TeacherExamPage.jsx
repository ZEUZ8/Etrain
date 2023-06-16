import React from 'react'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherExams from '../../../components/teachers/exams/TeacherExams'

const TeacherExamPage = () => {
  return (
    <div>
      <TeacherSideBar/>
      <Navbar/>
      <TeacherExams/>
    </div>
  )
}

export default TeacherExamPage
