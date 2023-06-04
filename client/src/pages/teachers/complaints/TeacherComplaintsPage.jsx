import React, { useState } from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import TeacherComplaints from '../../../components/teachers/complaints/TeacherComplaints'
import { makeComplaint, makeReview } from '../../../axios/services/TeacherSrevices/teacherServices'

const  TeacherComplaintsPage = (page) => {
  const currentPage = page.page

 

  const makeSubmit = async(value,token)=>{
      try{
        if(currentPage === "complaint"){
          var response = await makeComplaint(value,token)
        }else{
          console.log("entered in the review making function")
          var response = await makeReview(value,token)

        }
        return(response)
      }catch(error){
        console.log(error)
      }
        // console.log(values)
      // try{
      //   const response = await makeComplaint(token,values)
      //   console.log(response.msg)
      //   if(response.msg === "complaint created"){
      //     toast.success(response.msg)
      //   }else{
      //     toast.error(response.msg)
      //   }
      // }catch(error){
      //   console.log(error)
      //   toast.error(error.msg)
      // }
  }
  return (
    <div>
        < TeacherSideBar/>
        < Navbar />
        <TeacherComplaints page={currentPage} makeSubmit={makeSubmit}/>
    </div>
  )
}

export default TeacherComplaintsPage
