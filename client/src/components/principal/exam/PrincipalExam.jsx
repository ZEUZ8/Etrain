import React, { useEffect,useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExamValidation } from "../../../validations/principal/examValidation";
import {CreateExam} from "../../../axios/services/principalServices/principlaServices"
import { GetExam } from "../../../axios/services/principalServices/principlaServices";

const PrincipalExam = () => {

  const pricnipalData = useSelector(state => state.principalReducer.principal)
  const token = pricnipalData?.token

  useEffect(()=>{
    const fetchData = async()=>{
      console.log("entered in the fetch dat")
      try{
        const response = await GetExam(token)
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  const onSubmit = async()=>{
    try{
      const response = await CreateExam(token,values)
      console.log(response.msg)
      if(response.msg === "Exam created"){
        toast.success(response.msg)
      }else{
        toast.error(response.msg)
      }
    }catch(error){
      console.log(error)
      toast.error(error.msg)
    }
  }
  
  const {values,errors,touched,handleChange,handleSubmit,handleBlur} = 
  useFormik({
    initialValues:{
      examName:"",
      timeTable:"",
      startDate:"",
      endDate:"",
      examDiscription:"",
    },
    validationSchema:ExamValidation,
    onSubmit
  })
  
  return (
    <div>
      < ToastContainer />
      <div className="md:ml-64 p-4">
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-1/2 bg-teal-100 m-2 items-center justify-center  rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Schedule an Exam
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
                      Exam Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="examName"
                      type="text"
                      placeholder="Exam Name"
                      name="examName"
                      value={values.examName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.examName && touched.examName && (
                      <p className="text-red-600">{errors.examName}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Time Table
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="timetalbe"
                      type="file"
                      placeholder="Time Table"
                      name="timeTable"
                      value={values.timeTable}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.timeTable && touched.timeTable && (
                      <p className="text-red-600">{errors.timeTable}</p>
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
                        <p className="text-red-600">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Exam Discription
                    </label>
                    <textarea
                      id="discription"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write Discription"
                      name="examDiscription"
                      value={values.examDiscription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.examDiscription && touched.examDiscription && (
                      <p className="text-red-600">{errors.examDiscription}</p>
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

          <div className="w-1/2 bg-teal-100 m-2 rounded-2xl shadow-2xl">
            <div>
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Scheduled Exams
              </p>

              {/* {taskToDisplay.map((task, index) => {
                return (
                  <a
                    key={index}
                    class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                  >
                    <div class=" text-gray-500">
                      <SiBookstack className="w-10 h-10" /> */}

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
{/* 
                      <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                        {task.taskName}
                      </h3>

                      <p class="mt-2 hidden text-sm sm:block">
                        {task.taskDiscription}
                      </p>
                    </div> */}
                    {/* 
                    <span
                      class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                    >
                      4.3
                    </span> */}
                  {/* </a>
                );
              })} */}
            </div>
            {/* <ReactPaginate
              containerClassName="flex justify-center items-center mt-5"
              pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
              previousLinkClassName="  text-white font-bold py-3 px-1 "
              nextLinkClassName="  text-white font-bold py-3 px-1 "
              previousLabel={<GrFormPrevious name="arrow-left" />}
              nextLabel={<GrFormNext name="arrow-right" />}
              breakLabel={"..."}
              pageCount={Math.ceil(scheduledTasks.length / taskPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              // containerClassName={'pagination'}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalExam;