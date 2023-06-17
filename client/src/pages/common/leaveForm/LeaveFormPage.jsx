import React, { Component } from 'react'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import SideBar from '../../../components/landing/sideBar/SideBar'
import LeaveForm from '../../../components/landing/LeaveForm/LeaveForm'
import Navbar from '../../../components/landing/navbar/Navbar'

const LeaveFormPage = ({user}) => {
  console.log(user)
  return (
    <div>
      <Navbar/>
      {user === `student` ? <SideBar/> : user === "teacher" && <TeacherSideBar/> }
      < LeaveForm user={user}/>
    </div>
  )
}

export default LeaveFormPage
