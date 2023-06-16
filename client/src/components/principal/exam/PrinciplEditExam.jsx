import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ExamValidation } from "../../../validations/principal/examValidation";
import Loader from "../../landing/loader/Loader";

const PrinciplEditExam = ({ setIsOn, loading, currentExam }) => {
  const {
    endDate,
    examName,
    examClass,
    startDate,
    timeTable,
    examDiscription,
  } = currentExam;
  const onSubmit = async () => {
    try {
      //   const response = await CreateExam(token, values);
      //   console.log(response.msg);
      //   if (response.msg === "Exam created") {
      //     setExams([...exams,response.exam])
      //     toast.success(response.msg);
      //   } else {
      //     toast.error(response.msg);
      //   }
    } catch (error) {
      console.log(error);
      //   toast.error(error.msg);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        examName: examName,
        timeTable: timeTable,
        startDate: startDate,
        endDate: endDate,
        examDiscription: examDiscription,
        examClass: examClass,
      },
      validationSchema: ExamValidation,
      onSubmit,
    });

  const handleClick = () => {
    setIsOn(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="h-full w-">
        <div className="flex justify-end">
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
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="bg-violet-300 hover:bg-violet-400 w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default PrinciplEditExam;
