import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { GiPaperTray } from "react-icons/gi";

import "react-toastify/dist/ReactToastify.css";
import { ExamValidation } from "../../../validations/principal/examValidation";
import { CreateExam,GetExam,UpdateExam } from "../../../axios/services/principalServices/principlaServices";
import PrinciplEditExam from "./PrinciplEditExam";

const PrincipalExam = () => {

  const pricnipalData = useSelector(
    (state) => state.principalReducer
  );
  const token = pricnipalData?.token;


  const navigate = useNavigate()

  const errorMsgs = ["Access Denied","jwt malformed","jwt expired"]
  const [loading,setLoading] = useState(false)
  const [exams, setExams] = useState([]);
  const [currentExam,setCurrentExam] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [isOn,setIsOn] = useState(false)
  const examPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetExam(token);
        if(response === "Access Denied" || response.message === "jwt malformed" || response.message === "jwt expired"){
          navigate("/principal/login")
        }else{
          setExams(response.exams);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]);

  const taskToDisplay = exams?.slice(
    currentPage * examPerPage,
    (currentPage + 1) * examPerPage
  );

  const onSubmit = async () => {
    try {
      const response = await CreateExam(token, values);
      if (response.msg === "Exam created") {
        setExams([...exams,response.exam])
        toast.success(response.msg);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };

  /* function for Updating the exam that created by the principal */
  const handleUpdation = async(value)=>{
    try {
      const response = await UpdateExam(token, currentExam._id,value);
      console.log(response.msg);
      if(errorMsgs.some((msg)=> msg === response.msg || response.message)){
        navigate("/principal/login")
      }else if (response.msg === "Exam Updated") {

        setExams(exams.map((exam)=>{
          if(exam._id === response.exam._id){
            return response.exam
          }
          return exam
        }))
        toast.success(response.msg);
        setIsOn(false)
      } else {
        toast.error(response.msg);
      }
  } catch (error) {
    console.log(error);
  }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        examName: "",
        timeTable: "",
        startDate: "",
        endDate: "",
        examDiscription: "",
        examClass:""
      },
      validationSchema: ExamValidation,
      onSubmit,
    });

  //function for the modal opening with the current exam data
  const handleEditClick = (exam)=>{
    setIsOn(true)
    setCurrentExam(exam)
  }

  //function for the pagination controll  
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  return (
    <div>
      <ToastContainer />
      <div className="md:ml-64 p-4">
      {isOn && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
         <PrinciplEditExam
           setIsOn={setIsOn} 
           loading={loading} 
           currentExam={currentExam}
           handleUpdation={handleUpdation}
         />
       </div>
      )}
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-1/2 bg-fuchsia-100 m-2 items-center justify-center  rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Schedule an Exam
              </p>
              <div className="w-full">
                <form
                  className="bg-white shadow-md  px-8 pt-6 pb-10 mb-10 rounded-xl"
                  onSubmit={handleSubmit}
                >

                  <div className="flex">
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

                    <div className="mb-5 flex-1 ml-3">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="endDate"
                      >
                        Class
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="examClass"
                        type="number"
                        name="examClass"
                        placeholder="Exam class"
                        value={values.examClass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.examClass && touched.examClass && (
                        <p className="text-red-600">{errors.examClass}</p>
                      )}
                    </div>

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

          <div className="w-1/2 bg-fuchsia-100 m-2 rounded-2xl shadow-2xl">
            <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
              Scheduled Exams
            </p>
            <div className="grid grid-cols-2">
              {taskToDisplay?.map((exam, index) => {
                return (
                  <a
                    key={index}
                    onClick={()=>handleEditClick(exam)}
                    class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                  >
                    <div class=" text-gray-500">
                      <GiPaperTray className="w-10 h-10" />

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
                      </svg>  */}

                      <h3 class="mt-4 text-sm font-bold text-gray-900  sm:text-md w-full">
                        Name : {exam.examName}
                       
                      </h3>
                      <h3 class="mt-4 text-sm font-bold text-gray-900  sm:text-md w-full">
                        Class : {exam.examClass}
                       
                      </h3>

                      {/* <p class="mt-2 hidden text-sm sm:block">
                        {exam.examDiscription}
                      </p> */}
                    </div>

                    {/* <span
                      class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                    >
                      4.3
                    </span>  */}
                  </a>
                );
              })}
            </div>
            <ReactPaginate
              containerClassName="flex justify-center items-center mt-5"
              pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
              previousLinkClassName="  text-white font-bold py-3 px-1 "
              nextLinkClassName="  text-white font-bold py-3 px-1 "
              previousLabel={<GrFormPrevious name="arrow-left" />}
              nextLabel={<GrFormNext name="arrow-right" />}
              breakLabel={"..."}
              pageCount={Math.ceil(exams?.length / examPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              // containerClassName={'pagination'}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalExam;
