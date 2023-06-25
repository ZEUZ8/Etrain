import React from 'react'
import EditClass from '../../../components/principal/class/EditClass'
import Navbar from '../../../components/landing/navbar/Navbar'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"


const PrincipalEditClassPage = () => {
    console.log("entered in the page")
  return (
    <div>
        <Navbar/>
        <PrincipalSideBar/>
        <EditClass/>
    </div>
  )
}

export default PrincipalEditClassPage
