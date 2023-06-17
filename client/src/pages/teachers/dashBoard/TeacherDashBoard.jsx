import React from 'react'
import DashBoard from '../../../components/teachers/dashBoard/DashBoard'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const TeacherDashBoard = ({user}) => {
  return (
    <div>
        < Navbar/>
        < TeacherSideBar/>
        < ProfileComponent user={user} />
        < DashBoard />
    </div>
  )
}

export default TeacherDashBoard
