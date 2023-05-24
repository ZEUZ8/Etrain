import React from 'react'
import Profile from '../../../components/students/profile/Profile'
import SideBar from '../../../components/landing/sideBar/SideBar'
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const StudentProfile = () => {
  return (
    <div>
      < SideBar />
      < Navbar />
      < ProfileComponent />
      < Profile />
    </div>
  )
}

export default StudentProfile
