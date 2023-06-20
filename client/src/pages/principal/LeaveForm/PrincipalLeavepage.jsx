import React from 'react'
import PrincipalLeave from '../../../components/principal/LeaveForm/PrincipalLeave'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import Navbar from '../../../components/landing/navbar/Navbar'

const PrincipalLeavepage = () => {
  return (
    <div>
      <PrincipalSideBar/>
      <Navbar/>
      <PrincipalLeave/>
    </div>
  )
}

export default PrincipalLeavepage
