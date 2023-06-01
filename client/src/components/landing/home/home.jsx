import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './home.css'

const Home = ({userType}) => {
  console.log(userType)
  const data = useSelector(state => state.studentReducer)
  console.log(data)
  const navigate = useNavigate()
  const profileClick = ()=>{

    if(data.student.token){
      if(data.student.user === "student"){
        navigate("/profile")
      }else{
        navigate("/login")
      }
    }else{
      navigate("/signup")
    }

  }

  return (
    <div>
      <div style={{ backgroundImage: "url('/img/banner_bg.png')" }} className='bg-cover bg-center bg-no-repeat h-screen '>
        <nav class=" p-5 ">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" class="flex items-center">
                <img src="/img/logo.png" class="h-100 mr-4" alt="Etrain Logo" />
                {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100   md:flex-row md:space-x-8 md:mt-0 md:border-0  text-gray-900 dark:border-gray-700">
                <li>
                  {/* <a href="#" class="block py-2 pl-3 pr-4 text-gray-900  md:bg-transparent md:text-blue-700 md:p-0  md:dark:text-blue-500" aria-current="page">Home</a> */}
                  <a href="#" class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent
                   md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                    dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent 
                  md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                   dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent
                   md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                    dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent
                   md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                    dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li>
                <li>
                  <div  className='profile bg-[#FF663B] w-[8rem] rounded-full h-[3rem] flex items-center justify-center '>
                      <a  class=" py-2 pl-3 pr-4 text-white-900  text-white 
                      md:border-0  md:p-0 
                      flex justify-center" onClick={profileClick}>Profile</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="flex ">
          <div class="w-1/2 h-screen flex m-10">
            <div className='justify-center  items-center align-middle m-10 pl-10'>
              <h5 className='text-xs m-10 '>EVERY CHILD YEARNS TO LEARN</h5>
              <h1 className='text-5xl m-10 font-black leading-relaxed'>Making Your childs <br /> World Better</h1>
              <p className='text-sm m-10 '>Replenish seasons may male hath fruit beast were seas saw you arrie said man beast whales 
                his void unto last session for bite. Set have great you'll male grass  yielding yielding man</p>
                <div className='flex m-5'>
                  <div className='profile bg-[#FF663B] w-[8rem] rounded-full h-[3rem] flex items-center justify-center '>
                        <a href={data.student.token?`/`:`/signup`} class=" py-2 pl-3 pr-4 text-white-900  text-white 
                        md:border-0  md:p-0 
                        flex justify-center">Create</a>
                  </div>
                  <div className='profile border-2 border-[black] w-[8rem] rounded-full h-[3rem] flex items-center justify-center ml-4'>
                      <a href={data.student.token?`/`:`/login`} class=" py-2 pl-3 pr-4 text-white-900  text-[black]
                      md:border-0  md:p-0 
                      flex justify-center">Get Started</a>
                  </div>
                </div>
            </div>
          </div>
          <div class="w-1/2 h-full p-[4rem]">
            <img src="/img/background_banner.png" alt="" />
          </div>
        </div>
      </div>
  </div>
  )
}

export default Home
