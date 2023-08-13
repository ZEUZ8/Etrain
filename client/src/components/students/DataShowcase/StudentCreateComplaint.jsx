import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";

import Loader from "../../landing/loader/Loader";

import { addTeacherValidation } from "../../../validations/principal/addTeacherValidation";

const StudentCreateComplaint = ({
  setIsOn,
  handleAddTeacherSubmit,
  loading,
}) => {
  const handleClick = () => {
    setIsOn(false);
  };

  const onSubmit = async (values) => {
    handleAddTeacherSubmit(values);
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        teacherName: "",
        teacherSubject: "",
        teacherEmail: "",
      },
      validationSchema: addTeacherValidation,
      onSubmit,
    });

  return (
    <div>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="flex w-max bg-violet-50 m-2 items-center justify-center  rounded-3xl shadow-2xl">
          <div className="h-full w-max m-10">
            <div className="flex  justify-between items-center mt-5">
              <div>
                <p className="text-center text-xl  m-3 dark:text underline underline-offset-4">
                  Make Complaint
                </p>
              </div>
              <div>
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
                className="bg-white shadow-md  px-8 pt-6 pb-10  rounded-xl"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Complaint Topic
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="teacherName"
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

                <div>
                  <textarea
                    rows="4"
                    cols="50"
                    className="border rounded-l p-2 shadow text-gray-700"
                    placeholder="Complaint"
                    id="CommonCompaint"
                    type="text"
                    name="complaint"
                    value={values.complaint}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.complaint && touched.complaint &&(
                    <p className="text-red-600">{errors.complaint}</p>
                  )}
                </div>

                {/* <div className="flex">
                    <div className="mb-5 flex-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startDate"
                      >
                        Teacher Email
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="teacherEmail"
                        type="email"
                        placeholder="Teacher Email"
                        name="teacherEmail"
                        value={values.teacherEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.teacherEmail && touched.teacherEmail && (
                            <p className="text-red-600">{errors.teacherEmail}</p>
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
                  </div> */}

                <div className="flex items-center justify-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      className="bg-fuchsia-200 hover:bg-fuchsia-300 w-full mt-3  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Create
                    </button>
                  )}
                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a> */}
                </div>
              </form>
              <p className="text-center pt-3">
                this complaint you creating will be annonymouse
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCreateComplaint;
