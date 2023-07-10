import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import Login from "../../../components/students/login/login"
import {studentLogin} from '../../../axios/services/studentServices/studentServices';
import { teacherLoginService } from '../../../axios/services/TeacherSrevices/teacherServices';
import { principalLoginService } from '../../../axios/services/principalServices/principlaServices';
import {userLogin} from "../../../redux/studentSlice";
import {teacherLogin} from "../../../redux/teacher";
import { principalLogin } from '../../../redux/principal';
import { toast } from 'react-toastify';

const StudentLogin = ({userType}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(value)=>{
    if(userType === "teacher"){
      var response = await teacherLoginService(value)
    }else if(userType === "principal"){
      var response = await principalLoginService(value)
    }else{
      var response = await studentLogin(value)
    }
    if(response.msg === "login succesfull"){
      const action = {
        user:response.user,
        token:response.token,
        id:response.id
      }
      if(userType === "teacher"){
        dispatch(teacherLogin(action))
        // return("teacherLogin succesfull")
      }else if(userType === "principal"){
        dispatch(principalLogin(action))
        // return("principalLogin succesfull")
      }else{
        dispatch(userLogin(action))
        // return("studentLogin succesfull")
      }
      return({msg:"Login Successfull",user:userType})
    }
    else{
      console.log(response.msg)
      return(response.msg)
    }
  }
  return (
    <div>
      <Login handlingSubmit={handleSubmit} userType={userType}/>
    </div>
  )
}

export default StudentLogin
