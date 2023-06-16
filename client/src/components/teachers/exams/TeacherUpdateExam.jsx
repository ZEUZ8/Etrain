import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { MarksValidation } from "../../../validations/teachers/MarksValidation";
import { CreateExamMark, GetMarks } from "../../../axios/services/TeacherSrevices/teacherServices";
import Loader from "../../landing/loader/Loader";

const TeacherUpdateExam = ({setIsOn,loading,currentExam,currentStudent,token}) => {
  let errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"];

  const navigate = useNavigate()
  const [editingExam,setEditingExam] = useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const examId = currentExam._id
        const studentId = currentStudent._id
        const existingMark = await GetMarks(token,studentId,examId)
        if(errorMsgs.some((msg)=>msg===existingMark.msg)){
          navigate("/teacher/login")
        }else if(existingMark.msg === "succesfull"){
          setEditingExam(existingMark.Mark)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  const onSubmit = async () => {
    const formData ={
      value:values,
      exam:currentExam,
      studentId:currentStudent._id
    }
    try {
        const response = await CreateExamMark(token, formData);
        console.log(response);
        if(errorMsgs.some((msg)=> msg === response.msg)){
          navigate('/teacher/login')
        }else if (response.msg === "updated") {
          toast.success(response.msg);
          setIsOn(false)
        } else {
          toast.error(response.msg);
        }
    } catch (error) {
      console.log(error);
      //   toast.error(error.msg);
    }
  };
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        examName: currentExam.examName,
        studentName:currentStudent.name,
        english:editingExam? editingExam?.english : "",
        mathematics:editingExam ? editingExam?.mathematics : '',
        science:editingExam ? editingExam?.science : '',
        malayalam:editingExam? editingExam?.malayalam : '',
        grade:editingExam? editingExam?.grade : "",
        totalMark: editingExam? editingExam?.totalMark:""
      },
      validationSchema: MarksValidation,
      onSubmit,
    });

  const handleClick = () => {
    setIsOn(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="h-full w-">
        <div className="w-full">
          <form
            className="bg-white shadow-md  px-8 pt-6 pb-10 mb-10 rounded-xl"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="flex mb-7">
                <div>
                  <p className="text-center underline underline-offset-4 ">
                    Edit Exam
                  </p>
                </div>
                <button
                  onClick={handleClick}
                  type="button"
                  className="   text-gray-900  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-500 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
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
                  readOnly
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
                  Student Name
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="studentName"
                  type="text"
                  name="studentName"
                  readOnly
                  value={values.studentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.studentName && touched.studentName && (
                  <p className="text-red-600">{errors.studentName}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-center underline underline-offset-8 mb-7">
                Subjects Marks
              </p>
            </div>
            <div className="flex">
              <div className="mb-5 flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  English
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="english"
                  type="number"
                  name="english"
                  placeholder={editingExam? editingExam?.english:"Subject Mark"} 
                  value={values.english}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.english && touched.english && (
                  <p className="text-red-600">{errors.english}</p>
                )}
              </div>

              <div className="mb-5 flex-1 ml-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endDate"
                >
                  Mathematics
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mathematics"
                  type="number"
                  name="mathematics"
                  placeholder={editingExam? editingExam?.mathematics:"Subject Mark"}
                  value={values.mathematics}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mathematics && touched.mathematics && (
                  <p className="text-red-600">{errors.mathematics}</p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="mb-5 flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  Malayalam
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="malayalam"
                  type="number"
                  name="malayalam"
                  placeholder={editingExam? editingExam?.malayalam:"Subject Mark"}
                  value={values.malayalam}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.malayalam && touched.malayalam && (
                  <p className="text-red-600">{errors.malayalam}</p>
                )}
              </div>

              <div className="mb-5 flex-1 ml-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endDate"
                >
                  Science
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="science"
                  type="number"
                  name="science"
                  placeholder={editingExam? editingExam?.science:"Subject Mark"}
                  value={values.science}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.science && touched.science && (
                  <p className="text-red-600">{errors.science}</p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="mb-5 flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  Total Mark
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="totalMark"
                  type="number"
                  name="totalMark"
                  placeholder={editingExam? editingExam?.totalMark:"Total Mark"}
                  value={values.totalMark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.totalMark && touched.totalMark && (
                  <p className="text-red-600">{errors.totalMark}</p>
                )}
              </div>

              <div className="mb-5 flex-1 ml-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endDate"
                >
                  Exam Grade
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="grade"
                  type="string"
                  name="grade"
                  placeholder={editingExam? editingExam?.grade:"Grade"}
                  value={values.grade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.grade && touched.grade && (
                  <p className="text-red-600">{errors.grade}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="bg-left-gradient hover:bg-orange-500 w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              )}
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpdateExam;
