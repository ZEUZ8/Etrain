import React from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import TeacherAttandence from '../../../components/teachers/attandence/TeacherAttandence'

const TeacherAttadencePage = () => {
  return (
    <div className='md:ml-64'>
        < Navbar />
        < TeacherSideBar />
        < TeacherAttandence />
    </div>
  )
}

export default TeacherAttadencePage
