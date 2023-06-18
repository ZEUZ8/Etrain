import React, { useState, useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { GetTeacher } from "../../../axios/services/TeacherSrevices/teacherServices";
import { GetStudent } from "../../../axios/services/studentServices/studentServices";
import { GetPrincipal } from "../../../axios/services/principalServices/principlaServices";
import ProfileEdit from "./ProfileEdit"

const ProfileComponent = ({ user }) => {
  const teacherData = useSelector((state) => state.teacherReducer.teacher);
  const teacherToken = teacherData?.token;
  const teacherId = teacherData?.id

  const studentData = useSelector((state) => state.studentReducer.student);
  const studentToken = studentData?.token;
  const studentId = studentData?.id

  const principalData = useSelector((state) => state.principalReducer.principal);
  const principalToken = principalData?.token;
  const principalId = principalToken?.id

  const navigate = useNavigate()
  const [principal,setPrincipal] = useState('')
  const [teacher,setTeacher] = useState('')
  const [student,setStudent] = useState('')
  const [isOn,setIsOn] = useState(false)
  const [loading,setLoaind] = useState('')
  const errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"]


  useEffect(() => {
    const fetchData = async ()=>{
      if(user === "teacher"){
        const response = await GetTeacher(teacherToken,teacherId)
        if(errorMsgs.some((msg)=> msg === response.msg)){
          navigate("/teacher/login")
        }else if(response.msg === "succesfull"){
          setTeacher(response.teacher)
        }
      }else if(user === "student"){
        const response = await GetStudent(studentToken,studentId)
        if(errorMsgs.some((msg)=> msg === response.msg)){
          navigate("/login")
        }else if(response.msg === "succesfull"){
          setStudent(response.student)
        }
        console.log(response)
      }else if(user === "principal"){
        const response = await GetPrincipal(principalToken,studentId)
        if(errorMsgs.some((msg)=>msg === response.msg)){
          navigate("/principal/login")
        }else if(response.msg === "succesfull"){
          setPrincipal(response.principal)
        }
        console.log(response)
      }
    }
    fetchData()
  },[user]);

  const handleProfileEdit = async()=>{
    setIsOn(true)
  }


  return (
    <div>
      <div class="p-4 sm:ml-64 flex justify-center">
      {isOn && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-baseline justify-center bg-gray-900 bg-opacity-50 z-50">
         <ProfileEdit
           setIsOn={setIsOn} 
           loading={loading} 
           user={user}
         />
       </div>
      )}
        <div
          class={`flex items-center justify-between h-[6rem] w-[60rem] mb-4 rounded-[1rem] ${
            user === "teacher"
              ? `bg-violet-400`
              : user === "principal"
              ? `bg-fuchsia-400`
              : `bg-left-gradient`
          } `}
        >
          <div class="flex flex-wrap justify-start">
            <div class="w-6/12 sm:w-4/12 px-4">
              <img
                src="img/girl.jpg"
                alt="profile"
                class="shadow rounded-full h-[4.5rem] w-[15rem] align-middle border-none"
              />
            </div>
            <p className=" flex items-center text-white">{user=== "teacher"? teacher.name  : "sinsn" }</p>
          </div>

          <div className="mr-10 flex justify-between w-max">
            <div className=" flex">
              <div className="mx-5 text-white sm:text-md md:text-2xl">{teacher.class}{ teacher.division}</div>
            </div>
            <div>
              <p 
               class="text-1xl text-gray-400 dark:text-white underline underline-offset-4 hover:cursor-pointer sm:text-xs"
               onClick={handleProfileEdit}
               >
                EDIT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
