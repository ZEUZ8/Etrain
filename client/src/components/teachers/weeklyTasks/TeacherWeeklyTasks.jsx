import React, { useEffect,useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { SiBookstack } from "react-icons/si";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import Loader from "../../landing/loader/Loader";
import { weaklyTaskValidation } from "../../../validations/teachers/weeklyTaskValidation";
import { weeklyTasks } from "../../../axios/services/TeacherSrevices/teacherServices";
import { GetWeeklyTasks } from "../../../axios/services/TeacherSrevices/teacherServices";
import { useNavigate } from "react-router-dom";

const TeacherWeeklyTasks = () => {

  const teacherDate = useSelector(state => state.teacherReducer.teacher)
  const token = teacherDate?.token

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage] = useState(0)
  const [scheduledTasks,setScheduledTask] = useState([])
  const taskPerPage = 2;

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await GetWeeklyTasks(token)
        if(response.msg === "succesfull"){
          setScheduledTask(response.tasks)
        }else if(response.msg === "jwt malformed" || response.msg == "Access Denied" ){
          navigate("/teacher/login")
        }else{
          toast.error(response.msg)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  const taskToDisplay = scheduledTasks.slice(
    currentPage * taskPerPage,
    (currentPage + 1 ) * taskPerPage
  )

  const onSubmit = async(values) => {
    console.log("enterd in the onSubmit function");
    const response = await weeklyTasks(token,values)

    if(response.msg === "weekly task created"){
      setScheduledTask([...scheduledTasks,response.tasks])
      toast.success(response.msg)
    }else{
      console.log("sinsi")
      toast.error(response.msg)
    }
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: {
      taskName: "",
      startDate: "",
      endDate: "",
      taskDiscription: "",
    },
    validationSchema: weaklyTaskValidation,
    onSubmit,
  });

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  return (
    
    <div>
        <ToastContainer />
      <div className="p-4 sm:ml-64">

        <div className="flex justify-center flex-col md:flex-row">

          <div className="flex w-1/2 bg-violet-200 m-2 items-center justify-center  rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                create Weekly Tasks
              </p>
              <div className="w-full">
                <form
                  className="bg-white shadow-md  px-8 pt-6 pb-10 mb-10 rounded-xl"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Task Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="taskName"
                      type="text"
                      placeholder="taskName"
                      name="taskName"
                      value={values.taskName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                      {errors.taskName && touched.taskName && (
                            <p className='text-red-600'>{errors.taskName}</p>
                          )}
                  </div>

        

                  <div className="flex">

                    <div className="mb-5 flex-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startDate"
                      >
                        Start Date
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        type="date"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.startDate && touched.startDate && (
                        <p className="text-red-600">{errors.startDate}</p>
                      )}
                    </div>

                    <div className="mb-5 flex-1 ml-3">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="endDate"
                      >
                        End Date
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        type="date"
                        name="endDate"
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                        {errors.endDate && touched.endDate && (
                              <p className='text-red-600'>{errors.endDate}</p>
                            )}
                    </div>
                  </div>

                    <div className="mb-3">
                      <label
                        for="message"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                      >
                        Task Discription
                      </label>
                      <textarea
                        id="discription"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write Discription"
                        name="taskDiscription"
                        value={values.taskDiscription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                        {errors.taskDiscription && touched.taskDiscription && (
                              <p className='text-red-600'>{errors.taskDiscription}</p>
                            )}
                    </div>

                

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-left-gradient hover:bg-rose-400 w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Create
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot Password?
                    </a> */}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-violet-200 m-2 rounded-2xl shadow-2xl">
            <div>
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Scheduled Weekly Tasks
              </p>
              
              {taskToDisplay.map((task,index)=>{

                return(
                  <a key={index} class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8">
                  <div class=" text-gray-500">
                    <SiBookstack className="w-10 h-10" />
  
                    {/* <svg
                          class="h-8 w-8 sm:h-10 sm:w-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          ></path>
                        </svg> */}
  
                    <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                     {task.taskName}
                    </h3>
  
                    <p class="mt-2 hidden text-sm sm:block">
                      {task.taskDiscription}
                    </p>
                  </div>
                  {/* 
                      <span
                        class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                      >
                        4.3
                      </span> */}
                </a>
                )
              })}
         

            </div>
            <ReactPaginate 
                containerClassName="flex justify-center items-center mt-5"
                pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
                previousLinkClassName="  text-white font-bold py-3 px-1 "
                nextLinkClassName="  text-white font-bold py-3 px-1 "
                previousLabel={<GrFormPrevious name="arrow-left" />}
                nextLabel={< GrFormNext name="arrow-right" />}
                breakLabel={'...'}
                pageCount={Math.ceil(scheduledTasks.length / taskPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                // containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherWeeklyTasks;
