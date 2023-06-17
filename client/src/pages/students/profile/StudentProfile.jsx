import React from 'react'
import Profile from '../../../components/students/profile/Profile'
import SideBar from '../../../components/landing/sideBar/SideBar'
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const StudentProfile = ({user}) => {
  return (
    <div>
      < SideBar />
      < Navbar />
      < ProfileComponent user={user}/>
      < Profile />
    </div>
  )
}

export default StudentProfile
