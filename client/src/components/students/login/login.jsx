import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"

import { loginSchema } from "../../../validations/students/loginValidation";
import { TeacherGoogleLogin } from "../../../axios/services/TeacherSrevices/teacherServices";
import { PrincipalGoogleLogin } from "../../../axios/services/principalServices/principlaServices";
import { StudentGoogleLogin } from "../../../axios/services/studentServices/studentServices";
import {userLogin} from "../../../redux/studentSlice";
import {teacherLogin} from "../../../redux/teacher";
import { principalLogin } from '../../../redux/principal';

const Login = ({ handlingSubmit, userType }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit() {
    setLoading(true);
    const result = await handlingSubmit(values);
    console.log(result, "the rsult taht come inthe way");
    if (result.msg === "Login Successfull") {
      toast.success("Login Succesull");
      if (result.user === "principal" || result.user === "teacher") {
        navigate(`/${result.user}`);
      } else {
        navigate("/");
      }
    } else {
      toast.error(result);
      if (result.user === "teacher" || result.user === "principal") {
        navigate(`/${result.user}/login`);
      } else {
        navigate("/");
      }
      // navigate('/signup')
    }
    setLoading(false);
  }

  const handleLogin = async(email)=>{
    try{
      if(userType === "student"){
        var response = await StudentGoogleLogin(email)
      }else if(userType === "teacher"){
        var response = await TeacherGoogleLogin(email)
      }else if(userType === "principal"){
        var response = await PrincipalGoogleLogin(email)
      }
      console.log(response,'the response')
      const action = {
        user:response.user,
        token:response.token,
        id:response.id
      }
      if(userType === "teacher"){
        dispatch(teacherLogin(action))
        navigate("/teacher")
      }else if(userType === "principal"){
        dispatch(principalLogin(action))
        navigate("/principal")
      }else if(userType === "student"){
        dispatch(userLogin(action))
        navigate("/")
      }else{
        toast.error(response.msg)
      }
    }catch(err){
      console.log(err)
    }
  }

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  // const signupPage = ()=>{
  //   if(userType === "teacher"){
  //     navigate("/teacher/register")
  //   }else{
  //     navigate("/signup")
  //   }
  // }

  return (
    <div>
      <ToastContainer />
      <div
        style={{ backgroundImage: "url('/img/banner_bg.png')" }}
        className="bg-cover bg-center bg-no-repeat h-screen "
      >
        <div class="pt-10  pl-10">
          <div class="flex justify-left items ">
            <a href="/">
              <img src="/img/logo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <div
            class={`${
              userType === "teacher"
                ? `bg-sky-200`
                : userType === "student"
                ? `bg-left-gradient`
                : `bg-red-400`
            } w-[32rem]   h-[42rem] align-middle rounded-[5rem]`}
          >
            {/* <div class="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8"> */}{" "}
            {/* just removed the justify-center */}
            <div class="flex min-h-full flex-col   px-6 py-12 lg:px-8">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-start underline underline-offset-8 text-2xl font-bold leading-9 tracking-tight text-white  ">
                  Login
                </h2>
                <img
                  class="mx-auto h-[4rem] w-[4rem] rounded-full bg-white "
                  src="/img/girl.jpg"
                  alt="Your Image"
                />
                <h4 class="text-white flex justify-center  underline underline-offset-4  mt-1">
                  {" "}
                  Name
                </h4>
              </div>

              <div class="mt-5 sm:mx-auto sm:w-full ">
                <form class="space-y-6" method="POST" onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-white"
                    >
                      Email
                    </label>
                    <div class="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        class="block w-full rounded-[0.8rem] border-0 py-2.5 pl-3
                        text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 ">
                    <div class="flex items-center justify-between ml-2">
                      <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-white"
                      >
                        Password
                      </label>
                      {/* <div class="text-sm">
                          <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div> */}
                    </div>
                    <div class="mt-2 ml-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 pl-3
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                      />
                      {errors.password && touched.password && (
                        <p className="text-red-600">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <button
                      type="submit"
                      class="flex w-3/5 justify-center rounded-[6rem] bg-white px-3 py-1.5 text-sm font-semibold leading-6
                     text-[#ef4444] shadow-lg hover:bg-indigo-500 focus-visible:outline 
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1
                      "
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                {/*               
                {userType !== "principal" && ( <p class=" text-center mt-2 text-sm text-gray-500">
                  Create Account?
                  <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" 
                  onClick={signupPage}> 
                  Click here</a>
                </p>)} */}
              </div>
              <div>
                <h4 class="text-white underline underline-offset-8 pt-[1rem]">
                  Login With
                </h4>
                <div class="flex justify-center mt-4">
                  {/* <div class="bg-whit mt-1 w-3/5  h-[5rem] flex flex-row justify-start gap-6 ">
                      <div className='rounded-full  w-[3rem] h-[6rem] '>
                        <a href="#">
                          <img src="/img/google.png" alt="google"  className="cursor-pointer hover:opacity-75  " />
                        </a>
                      </div>
                      <div className='rounded-full  w-[3rem] h-[6rem]'>
                        <a href="#">
                          <img src="/img/twitter.png" alt="google"  className="cursor-pointer hover:opacity-75 " />
                        </a>
                      </div>
                      <div className='rounded-full  w-[3rem] h-[6rem]'>
                        <a href="#">
                          <img src="/img/instagram.png" alt="google"  className="cursor-pointer hover:opacity-75 " />
                        </a>
                      </div>
                      <div className='rounded-full  w-[3rem] h-[6rem]'>
                        <a href="#">
                          <img src="/img/facebook.png" alt="google"  className="cursor-pointer hover:opacity-75 " />
                        </a>
                      </div>
                    </div> */}


                  {/* <div class="px-6 sm:px-0 max-w-sm">
                    <button
                      type="button"
                      class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                    >
                      <svg
                        class="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      Sign up with Google<div></div>
                    </button>
                  </div> */}


                  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLECLIENTID}>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        const Details = jwt_decode(credentialResponse.credential)
                        handleLogin(Details.email)
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                    
                  </GoogleOAuthProvider>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
