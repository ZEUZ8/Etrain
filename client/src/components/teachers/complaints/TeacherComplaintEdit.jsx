import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";

import { complaintValidation } from "../../../validations/teachers/conplaintValidation";

const TeacherComplaintEdit = ({ setIson, requiredPage ,currentData,handleEdit}) => {
  const handleClick = () => {
    setIson(false);
  };


  const onSubmit = async (values) => {
    handleEdit(values)
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        studentName: currentData.studentId.name,
        studentClass: currentData.studentId.studentClass,
        studentDivision: currentData.studentId.division,
        teacherName: currentData.teacherId.name,
        teacherSubject: currentData.teacherId.subject,
        complaint: currentData.complaint?currentData.complaint:currentData.review,
      },
      validationSchema: complaintValidation,
      onSubmit,
    });


  return (
    <div>
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-max bg-orange-50 m-2 items-center justify-center  rounded-3xl shadow-2xl">
            <div className="h-full w-max m-10">
                <div className="flex  justify-between items-center">
                     <div>
                        <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                            {requiredPage === "complaint"
                            ? "Edit Complaint"
                            : "Edit Reivew"}
                        </p>

                    </div>
                    <div >
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
              <div className="w-full pt-10">
                <form
                  className="bg-white shadow-md  px-8 pt-6 pb-10 mb-10 rounded-xl"
                    onSubmit={handleSubmit}
                >
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Student Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="studentName"
                      type="text"
                      placeholder="Student Name"
                      name="studentName"
                        value={values.studentName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.studentName && touched.studentName && (
                        <p className="text-red-600">{errors.studentName}</p>
                        )}
                  </div>

                  <div className="flex">
                    <div className="mb-5 flex-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startDate"
                      >
                        Student Class
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="studentClass"
                        type="number"
                        placeholder="Student Class"
                        name="studentClass"
                        value={values.studentClass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.studentClass && touched.studentClass && (
                            <p className="text-red-600">{errors.studentClass}</p>
                        )}
                    </div>

                    <div className="mb-5 flex-1 ml-3">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="endDate"
                      >
                        Student Division
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="studnetDivision"
                        type="text"
                        placeholder="Student Division"
                        name="studentDivision"
                        value={values.studentDivision}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.studentDivision && touched.studentDivision && (
                            <p className="text-red-600">{errors.studentDivision}</p>
                        )}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mb-5 flex-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startDate"
                      >
                        Teacher Name
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="TeacherName"
                        type="text"
                        placeholder="Teacher Name"
                        name="teacherName"
                        value={values.teacherName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.teacherName && touched.teacherName && (
                            <p className="text-red-600">{errors.teacherName}</p>
                        )}
                    </div>

                    <div className="mb-5 flex-1 ml-3">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="endDate"
                      >
                        Teacher Subject
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="TeacherSubject"
                        type="text"
                        placeholder="Teacher Subject"
                        name="teacherSubject"
                        value={values.teacherSubject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.teacherSubject && touched.teacherSubject && (
                            <p className="text-red-600">{errors.teacherSubject}</p>
                        )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Complaint
                    </label>
                    <textarea
                      id="complaint"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        requiredPage === "complaint"
                          ? `Write the Complaint`
                          : `Write the Review`
                      }
                      name="complaint"
                        value={values.complaint}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></textarea>
                    {errors.complaint && touched.complaint && (
                        <p className="text-red-600">{errors.complaint}</p>
                        )}
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-emerald-300 hover:bg-teal-300 w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update
                    </button>
                    {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default TeacherComplaintEdit;
