import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useFormik } from "formik";
import { studentSchema } from '../../../validations/students/signupValidation';
import { studentsRegister } from '../../../axios/services/studentServices/studentServices.js';


const SignUp = () => {
  const [loading,setLoading] = useState(false)

  // const navigate = useNavigate()

  async function onSubmit(){
    setLoading(true)
    console.log(values)
    const response = await studentsRegister(values)
    if(response.status == "New account created "){
      console.log("function enterd in the if condition")
    }else{
      console.log("entere in the else codition ")
    }
  }

  const {values,errors,touched,handleSubmit,handleChange,handleBlur} = 
  useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      class:"",
      division:"",
    },
    validationSchema:studentSchema,
    onSubmit,
  });

  const loginPage = async ()=>{
    alert("login page coming")
  }

  return (
    <div>
      <div style={{ backgroundImage: "url('/img/banner_bg.png')" }} className='bg-cover bg-center bg-no-repeat h-screen '>
        <div class="pt-10  pl-10">
          <div class="flex justify-left items ">
            <img src="/img/logo.png" alt="logo" />
          </div>
        </div>
        <div class="flex justify-center mt-5">
            <div class="bg-left-gradient w-[32rem]  h-[42rem] align-middle rounded-[5rem]"  >
              {/* <div class="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8"> */} {/* just removed the justify-center */} 
              <div class="flex min-h-full flex-col   px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                
                  <h2 class="mt-10 text-start underline underline-offset-8 text-2xl font-bold leading-9 tracking-tight text-white  " >Sign Up</h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full ">
                  <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className='flex '>
                      <div className='flex-1'>
                        <label for="email" class="block text-sm font-medium leading-6 text-white">Name</label>
                        <div class="mt-2">
                          <input
                            id="name" 
                            name="name" 
                            type="text"
                            autocomplete="name"
                            value={values.name}
                            onChange={handleChange}
                            required 
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 pl-3
                           shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                           />
                        </div>
                      </div>

                      <div className='flex-1 '>
                        <div class="flex items-center justify-between ml-2">
                          <label for="password" class="block text-sm font-medium leading-6 text-white">Phone</label>
                        </div>
                        <div class="mt-2 ml-2">
                          <input
                              id="phone"
                              name="phone"
                              type="phone"
                              autocomplete="phone"
                              value={values.phone} 
                              onBlur={handleBlur}
                              onChange={handleChange}
                             required class="block w-full rounded-[0.8rem] border-0 py-2.5 pl-3
                           text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            />
                            {errors.phone && touched.phone && (
                              <p class="text-red-600">{errors.phone}</p>
                            )}
                        </div>
                      </div>
                    </div>
                    
                    <div className='flex '>
                      <div className='flex-1'>
                        <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
                        <div class="mt-2">
                          <input 
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            autocomplete="email"
                            required 
                           class="block w-full rounded-[0.8rem] border-0 py-2.5 pl-3
                          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                           focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className='flex-1 '>
                        <div class="flex items-center justify-between ml-2">
                          <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
                          {/* <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                          </div> */}
                        </div>
                        <div class="mt-2 ml-2">
                          <input 
                            id="password"
                            name="password"
                            type="password" 
                            vlaue={values.password}
                            onChange={handleChange}
                            autocomplete="current-password" 
                            required 
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 pl-3
                           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " 
                          />
                        </div>
                      </div>
                    </div>

                    <div className='flex '>
                      <div className='flex-1'>
                        <label for="email" class="block text-sm font-medium leading-6 text-white">Class</label>
                        <div class="mt-2">
                          <input 
                            id="class" 
                            name="class" 
                            type="text" 
                            value={values.class}
                            onChange={handleChange}
                            autocomplete="class"
                            required 
                           class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 shadow-sm pl-3
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                            />
                        </div>
                      </div>

                      <div className='flex-1 '>
                        <div class="flex items-center justify-between ml-2">
                          <label for="password" class="block text-sm font-medium leading-6 text-white">Divisioin</label>
                        </div>
                        <div class="mt-2 ml-2">
                          <input 
                            id="division" 
                            name="division" 
                            type="text" 
                            value={values.division}
                            onChange={handleChange}
                            autocomplete="division" 
                            required 
                          class="block w-full rounded-[0.8rem] pl-3
                           border-0 py-2.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " 
                           />
                        </div>
                      </div>
                    </div>

                    <div class="flex justify-center">
                      <button type="submit" class="flex w-3/5 justify-center rounded-[6rem] bg-white px-3 py-1.5 text-sm font-semibold leading-6
                       text-[#ef4444] shadow-lg hover:bg-indigo-500 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        " 
                        >
                        Sign in
                        </button>
                    </div>
                  </form>
                
                  <p class=" text-center text-sm text-gray-500">
                    Have an Account?
                    <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" 
                    onClick={loginPage}> 
                    Click here</a>
                  </p>
                </div>
                <div>
                  <h4 class="text-white underline underline-offset-8 pt-[1rem]">SignUp With</h4>
                  <div class="flex justify-center">
                    <div class="bg-whit mt-5 w-3/5  h-[5rem] flex flex-row justify-start gap-6 ">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp
