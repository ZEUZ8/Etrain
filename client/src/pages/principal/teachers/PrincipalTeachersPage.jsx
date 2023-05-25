import React from 'react'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'
import PrincipalTeachers from "../../../components/principal/teachers/PrincipalTeachers"

const PrincipalTeachersPage = () => {
  return (
    <div style={{ backgroundImage: "url('/img/banner_bg.png')" }} className='bg-cover bg-center bg-no-repeat h-screen '>
      < PrincipalSideBar />
      < Navbar />
      < PrincipalTeachers />
    </div>
  )
}

export default PrincipalTeachersPage
