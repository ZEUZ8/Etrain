import React from 'react'
import SideBar from '../../../components/landing/sideBar/SideBar'
import Navbar from '../../../components/landing/navbar/Navbar'
import TimeTable from "../../../components/students/timeTable/TimeTable"

const StudentTimeTable = () => {
  return (
    <div>
        <SideBar />
        <Navbar />
        <TimeTable/>
    </div>
  )
}

export default StudentTimeTable
