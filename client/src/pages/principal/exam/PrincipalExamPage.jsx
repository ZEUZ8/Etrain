import React from 'react'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import PrincipalExam from '../../../components/principal/exam/PrincipalExam'
import Navbar from '../../../components/landing/navbar/Navbar'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const PrincipalExamPage = () => {
  return (
    <div>
      < PrincipalSideBar />
      < Navbar />
      < PrincipalExam/>
    </div>
  )
}

export default PrincipalExamPage
