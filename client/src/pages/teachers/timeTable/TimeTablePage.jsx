import React from 'react'
import TimeTable from '../../../components/teachers/timeTable/TimeTable'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import Navbar from '../../../components/landing/navbar/Navbar'

const TimeTablePage = () => {
  return (
    <div>
        <TeacherSideBar/>
        <Navbar/>
        <TimeTable/>
    </div>
  )
}

export default TimeTablePage
