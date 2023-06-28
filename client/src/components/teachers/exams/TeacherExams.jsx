import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiPaperTray } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import TeacherUpdateExam from '../../../components/teachers/exams/TeacherUpdateExam'
import {
  GetExams,
  GetStudents,
} from "../../../axios/services/TeacherSrevices/teacherServices";

const TeacherExams = () => {
  const teacherData = useSelector((state) => state.teacherReducer);
  const token = teacherData?.token;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentExam, setCurrentExam] = useState("");
  const [currentStudent,setCurrentStudent] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const examPerPage = 4;
  let errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"];

  useEffect(() => {
    //function for getting all the exams and upadting the state
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetExams(token);
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setExams(response.exams);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    //function for finding all the students and updating the state
    const classStudents = async () => {
      try {
        setLoading(true);
        const response = await GetStudents(token);
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/teacher/login");
        } else {
          setStudents(response.students);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    classStudents();
  }, []);
  //function for the modal opening with the current exam data
  const handleEditClick = (exam) => {
    setCurrentExam(exam);
  };

  //function for the modal opening and the passing the all the data that required
  const handleUpdateClick = async(data) => {
    setCurrentStudent(data)
    if(currentExam){
      setIsOn(true)
    }else{
      toast.error("Select An Exam")
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="md:ml-64 p-4">
        {isOn && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
         <TeacherUpdateExam
           setIsOn={setIsOn} 
           loading={loading} 
           currentExam={currentExam}
           currentStudent={currentStudent}
           token={token}
         />
       </div>
      )}
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-1/2 bg-violet-200 m-2 items-center justify-center  rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Scheduled Exams
              </p>
              {exams?.length > 0 ? (
                <div className="grid grid-cols-2">
                  {exams?.map((exam, index) => {
                    return (
                      <a
                        key={index}
                        onClick={() => handleEditClick(exam)}
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
              ) : (
                <div>
                  <p className="text-center">No Exam Found</p>
                  <img src="/img/No data-amico.svg" alt="no Exam found" />
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 bg-violet-200 m-2 rounded-2xl shadow-2xl">
            <div>
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                {currentExam
                  ? `Edit ${currentExam.examName}`
                  : "Select Exam to Updation"}
              </p>
              {students?.length > 0 ? (
                <div className="">
                  <div className="grid grid-cols-1 h-[35rem] sm:h-fit  overflow-y-scroll">
                    {students?.map((data, index) => {
                      return (
                        <a
                          key={index}
                          onClick={() => handleUpdateClick(data)}
                          class="relative items-start justify-between dark:bg-white m-5 rounded-xl border border-gray-100 p-1 shadow-xl sm:p-1 lg:p-3 h-fit"
                        >
                          <div className="flex ps-5 ">
                            <img
                              src="/img/girl.jpg"
                              alt="image"
                              className="h-8 w-8 rounded-3xl"
                            />
                            <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                              {data.name}
                            </h3>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p>No Student Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherExams;




