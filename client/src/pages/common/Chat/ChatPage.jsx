import React from 'react'
import Navbar from '../../../components/landing/navbar/Navbar'
import TeacherSideBar from '../../../components/teachers/sideBar/TeacherSideBar'
import SideBar from '../../../components/landing/sideBar/SideBar'
import PrincipalSideBar from "../../../components/principal/SideBar/PrincipalSideBar"
import Chat from '../../../components/landing/Chat/Chat'

const ChatPage = ({user}) => {
  return (
    <div>
        <div>
            <Navbar/>
            {user === "teacher" ? <TeacherSideBar/> : user === "student" ? < SideBar/> : < PrincipalSideBar/>}
            < Chat user={user}/>
        </div>
    </div>
  )
}

export default ChatPage
