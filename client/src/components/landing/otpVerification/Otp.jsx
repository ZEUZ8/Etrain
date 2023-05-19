import React, { useState } from 'react'
import {otpSchema} from "../../../validations/students/otpValidation"
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import {otpVerification} from "../../../axios/services/studentServices/studentServices"
import { useDispatch } from 'react-redux'
import {userLogin} from "../../../redux/studentSlice"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../loader/Loader'

const Otp = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()

    async function onSubmit(){
        setLoading(true)
        const respons = await otpVerification(values,location.state.id)
        if(respons.msg === "verified"){
            toast.success(respons.msg)
            dispatch(
                userLogin({
                    user:respons.user,
                    token:respons.token,
                    id:respons.id
                })
            )
            setLoading(false)
            navigate("/")
        }else {
            toast.error("OTP Not Match")
            setLoading(false)
        }
    }

    const {values,errors,touched,handleSubmit,handleChange,handleBlur} =
    useFormik({
        initialValues:{
            otp1:"",
            otp2:"",
            otp3:"",
            otp4:""

        },
        validationSchema:otpSchema,
        onSubmit
    })
  return (
    <div >
        <ToastContainer/>
      <div style={{ backgroundImage: "url('/img/banner_bg.png')" }} className='bg-cover bg-center bg-no-repeat h-screen bg-red-500'>
        {/* <div class="pt-10  pl-10">
            <div class="flex justify-left items ">
            <a href="/">
                <img src="/img/logo.png" alt="logo" />
            </a>
            </div>
        </div> */}
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                    <p>Email Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email {location.state.email}</p>
                    </div>
                </div>

                <div>
                    {loading? <Loader/>:
                    <form  method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-16">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div className="w-16 h-16 ">
                            <input className={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl
                             border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${errors.otp1 ? "border-red-500 " : "border-gray-200"}`}
                             value={values.otp1}
                             onChange={handleChange}
                             onBlur={handleBlur} 
                             type="text" 
                              name="otp1"
                              maxLength={1}
                              id="" 
                              />
                                {errors.otp1 && touched.otp1 }
                        </div>
                        <div className="w-16 h-16 ">
                            <input className={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none
                             rounded-xl border  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${errors.otp2 ? "border-red-500 " : "border-gray-200"}` }
                             value={values.otp2}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             type="text" 
                             name="otp2" 
                             maxLength={1}
                             id="" 
                             />
                                {errors.otp2 && touched.otp2}
                        </div>
                        <div className="w-16 h-16 ">
                            <input className={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none
                                rounded-xl border  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${errors.otp3 ? "border-red-500 " : "border-gray-200"}`}
                                value={values.otp3}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                name="otp3"
                                maxLength={1}
                                id="" />
                                   {errors.otp3 && touched.otp3}
                        </div>
                        <div className="w-16 h-16 ">
                            <input className={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none 
                                rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${errors.otp4 ? "border-red-500 " : "border-gray-200"}`} 
                                value={values.otp4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                name="otp4" 
                                maxLength={1}
                                id="" />
                                   {errors.otp4 && touched.otp4 }
                        </div>
                        </div>

                        <div className="flex flex-col space-y-5">
                        <div>
                            <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                            Verify Account
                            </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                            {/* <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a> */}
                        </div>
                        </div>
                    </div>
                    </form>}
                </div>
                </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Otp
