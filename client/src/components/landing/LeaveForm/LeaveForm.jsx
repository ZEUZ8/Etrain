import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SiBookstack } from "react-icons/si";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import Loader from "../../landing/loader/Loader";
import { leaveFormValidation } from "../../../validations/teachers/leaveFormValidation";
import {
  GetTeacherLeaves,
  CreateTeacherLeave,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import {
  GetStudentLeaves,
  CreateStudentLeave,
} from "../../../axios/services/studentServices/studentServices";

const LeaveForm = ({ user }) => {
  const teacherDate = useSelector((state) => state.teacherReducer);
  const teacherToken = teacherDate?.token;

  const studentData = useSelector((state) => state.studentReducer);
  const studentToken = studentData?.token;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [teacherLeaveForms, setTeacherLeavForms] = useState([]);
  const [studentLeaveFroms, setStudentLeaveForms] = useState([]);
  const taskPerPage = 2;

  let errorMsgs = ["jwt malformed", "Access Denied", "jwt expired"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (user === "teacher") {
          var response = await GetTeacherLeaves(teacherToken);
          if (errorMsgs.some((msg) => msg === response.msg)) {
            navigate("/teacher/login");
          } else if (response.msg === "succesfull") {
            setTeacherLeavForms(response.leaves);
          }
        } else if (user === "student") {
          var response = await GetStudentLeaves(studentToken);
          if (errorMsgs.some((msg) => msg === response.msg)) {
            navigate("/login");
          } else if (response.msg === "succesfull") {
            setStudentLeaveForms(response.leaves);
          }
        }
      } catch (error) {
        console.log(error.msg);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const onSubmit = async (values) => {
    try {
      if (user === "teacher") {
        const response = await CreateTeacherLeave(teacherToken, values);
        if (errorMsgs.some((error) => error === response.msg)) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setTeacherLeavForms(response.leaves);
        } else {
          toast.error([...teacherLeaveForms, response.msg]);
        }
      } else {
        const response = await CreateStudentLeave(studentToken, values);
        if (errorMsgs.some((error) => error === response.msg)) {
          navigate("/login");
        } else if (response.msg === "succesfull") {
          setStudentLeaveForms([...studentLeaveFroms, response.leaves]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        startDate: "",
        endDate: "",
        leaveReason: "",
      },
      validationSchema: leaveFormValidation,
      onSubmit,
    });

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  let LeaveFormsToDisplay;
  if (user === "teacher") {
    LeaveFormsToDisplay = teacherLeaveForms;
  } else if (user === "student") {
    LeaveFormsToDisplay = studentLeaveFroms;
  }
  const taskToDisplay = LeaveFormsToDisplay.slice(
    currentPage * taskPerPage,
    (currentPage + 1) * taskPerPage
  );
  return (
    <div>
      <ToastContainer />
      <div className="p-4 sm:ml-64">
        <div className="flex justify-center flex-col md:flex-row">
          <div
            className={`flex w-1/2 ${
              user === "student" ? `bg-left-gradient` : `bg-violet-200`
            } m-2 items-center justify-center  rounded-3xl shadow-xl`}
          >
            <div className="h-full w-">
              <p
                className={`${
                  user === "teacher" ? `text` : `text-white`
                }  text-center text-xl  m-5 dark:text underline underline-offset-4`}
              >
                Inform Leave
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
                      {user} Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder={`${user} Name`}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-600">{errors.name}</p>
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
                      Leave Reason
                    </label>
                    <textarea
                      id="leaveReason"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write Reason"
                      name="leaveReason"
                      value={values.leaveReason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.leaveReason && touched.leaveReason && (
                      <p className="text-red-600">{errors.leaveReason}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className={`${
                        user === "student"
                          ? `bg-violet-400 hover:bg-violet-300`
                          : `bg-left-gradient hover:bg-rose-400`
                      } w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                      type="submit"
                    >
                      Inform
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot Password?
                    </a> */}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className={`w-1/2 ${
              user === "teacher" ? `bg-violet-200` : `bg-left-gradient`
            } m-2 rounded-2xl shadow-2xl`}
          >
            <div>
              <p
                className={`${
                  user === "teacher" ? `text` : `text-white`
                } text-center text-xl  m-5 dark:text underline underline-offset-4`}
              >
                Informed Leaves
              </p>
              {taskToDisplay.length > 0 ? (
                <div>
                  {taskToDisplay.map((leave, index) => {
                    return (
                      <a
                        key={index}
                        class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                      >
                        <div class=" text-gray-500">
                          <SiBookstack className="w-10 h-10" />

                          <div className="flex justify-between my-3">
                            <p class="mt-2  text-sm text-black">
                              Start Date :{" "}
                              {new Date(leave.startDate)?.toDateString()}
                            </p>
                            <p class="mt-2  text-sm  text-black ml-4">
                              End Date :{" "}
                              {new Date(leave.endDate)?.toDateString()}
                            </p>
                          </div>

                          <div>
                            <p className="underline underline-offset-4 text-md text-black ">
                              Reason
                            </p>
                            <p class="mt-2 hidden text-sm sm:block p-2">
                              {leave.reason}
                            </p>
                          </div>
                        </div>
                        {/* 
                      <span
                        class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                      >
                        4.3
                      </span> */}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="text-white text-center ">
                  <p>No Leaves Found</p>
                  <img src="/img/No data-rafiki.svg" alt="Empty" />
                </div>
              )}
            </div>
           {taskToDisplay.length>0 && <ReactPaginate
              containerClassName="flex justify-center items-center mt-5"
              pageLinkClassName={`${user=== "teacher"? `bg-left-gradient` : `bg-violet-500`}  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1`}
              previousLinkClassName="  text-white font-bold py-3 px-1 "
              nextLinkClassName="  text-white font-bold py-3 px-1 "
              previousLabel={<GrFormPrevious name="arrow-left" />}
              nextLabel={<GrFormNext name="arrow-right" />}
              breakLabel={"..."}
              pageCount={Math.ceil(LeaveFormsToDisplay.length / taskPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              // containerClassName={'pagination'}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
