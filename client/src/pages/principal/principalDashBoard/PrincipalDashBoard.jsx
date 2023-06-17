import React from 'react'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import DashBoard from '../../../components/principal/DashBoard/DashBoard'
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const PrincipalDashBoard = ({user}) => {
  return (
    <div>
      < PrincipalSideBar />
      < Navbar />
      < ProfileComponent user={user}/>
      < DashBoard />
    </div>
  )
}

export default PrincipalDashBoard
