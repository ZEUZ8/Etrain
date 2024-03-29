import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { principalLogout } from "../../../redux/principal";
import { Link, useNavigate } from "react-router-dom";
import { teacherLogout } from "../../../redux/teacher";
import { BsClipboardDataFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { GrFormCalendar } from "react-icons/gr";
import { GrSchedules } from "react-icons/gr";
import {AiOutlineMessage} from "react-icons/ai"
import { io } from "socket.io-client";

const TeacherSideBar = () => {

  const teacherData = useSelector((state)=>state.teacherReducer)
  const id = teacherData?.id

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const socket = io("https://etrain-z30o.onrender.com");

  const socket = io("https://etrain-z30o.onrender.com");
  // const socket = io("http://localhost:4000");

  const handleLogOut = () => {
    dispatch(teacherLogout());
    navigate("/");
  };


  const [msg,setMsg] = useState('')
  const [notify,setNotify] = useState(false)

  useEffect(()=>{
    socket.emit("addUser",id)
  },[msg])
  
  socket.on("getNotify",(res)=>{
    setMsg(res?.text)
    if(id === res?.receiverId){
      setNotify(res.read)
    }
  })
  useEffect(()=>{
    setNotify(true)
  },[])

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <a
            href="/"
            class="flex items-center justify-center  pl-2.5 mb-5 mt-5"
          >
            <img
              src="/img/logo.png"
              className="h-6 w-max mr-3 sm:h-7 "
              alt="Etrain Logo"
            />
            {/* <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-red-500">Etrain</span> */}
          </a>
          <ul class="space-y-2 font-medium mt-10">
            <Link to="/teacher">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
            </Link>

            <Link to="/teacher/timetable">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  {/* <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg> */}
                  <GrSchedules />
                  <span class="ml-3">Time Table</span>
                </a>
              </li>
            </Link>

            <Link to="/teacher/students">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Students</span>
                </a>
              </li>
            </Link>

            <Link to="/teacher/attandence">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <BsClipboardDataFill className="w-6 h-6 " />

                  <span class="flex-1 ml-3 whitespace-nowrap">Attandence</span>
                </a>
              </li>
            </Link>

            <Link to="/teacher/exams">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Exams</span>
                  {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
               
                </a>
              </li>
            </Link>

            <Link to="/teacher/weeklyTasks">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">
                    Weekly Tasks
                  </span>
                  {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span> */}
                  {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span> */}
                </a>
              </li>
            </Link>

            <Link to="/teacher/reviews">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <TbReport className="w-6 h-6 " />
                  <span class="flex-1 ml-3 whitespace-nowrap">Reviews</span>
                  {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
                </a>
              </li>
            </Link>

            <Link to="/teacher/complaints">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <TbReport className="w-6 h-6 " />
                  <span class="flex-1 ml-3 whitespace-nowrap">Complaints</span>
                  {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
                </a>
              </li>
            </Link>

            <Link to="/teacher/chat">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Chat</span>
                </a>
              </li>
            </Link>

            <Link to="/teacher/leave">
              <li>
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300">
                  <GrFormCalendar className="w-6 h-6 " />
                  <span class="flex-1 ml-3 whitespace-nowrap">Leave Form</span>
                  <span>
                    {!notify && <AiOutlineMessage className="text-green-600" />}
                  </span>
                </a>
              </li>
            </Link>

            <li>
              <a
                onClick={handleLogOut}
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray hover:bg-gray-100 dark:hover:bg-gray-300"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* <div class="p-4 sm:ml-64">
          <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
              <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
              <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
          </div>
        </div> */}
    </>
  );
};

export default TeacherSideBar;
