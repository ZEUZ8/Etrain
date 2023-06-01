import React from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import TeacherWeeklyTasks from '../../../components/teachers/weeklyTasks/TeacherWeeklyTasks'
import ProfileComponent from '../../../components/landing/profileComponent/ProfileComponent'

const TeacherWeeklyTasksPage = () => {
  return (
    <div>
        < Navbar/>
        < TeacherSideBar/>
        {/* < ProfileComponent/> */}
        < TeacherWeeklyTasks />
    </div>
  )
}

export default TeacherWeeklyTasksPage
