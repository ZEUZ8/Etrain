import React from 'react'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'
import PrincipalClass from '../../../components/principal/class/PrincipalClass'

const principalClasses = () => {
  return (
    <div style={{ backgroundImage: "url('/img/banner_bg.png')" }} className='bg-cover bg-center bg-no-repeat h-screen '>
      < PrincipalSideBar />
      < Navbar />
      < PrincipalClass />
    </div>
  )
}

export default principalClasses
