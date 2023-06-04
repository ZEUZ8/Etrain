import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import { RiNewspaperFill } from "react-icons/ri";
import Loader from "../../landing/loader/Loader";
import TeacherComplaintEdit from "./TeacherComplaintEdit";
import "react-toastify/dist/ReactToastify.css";

import {
  EditComplaint,
  GetComplaints,
  GetReviews,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import { complaintValidation } from "../../../validations/teachers/conplaintValidation";

const TeacherComplaints = ({ page, makeSubmit }) => {
  const requiredPage = page;

  const teacherData = useSelector((state) => state.teacherReducer.teacher);
  const token = teacherData?.token;

  const [loading, setLoading] = useState(false);
  const [ison, setIson] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState("");
  const [data, setData] = useState([]);
  const datPerPage = 4;

  useEffect(() => {
    setLoading(true);
    const fetchComplaint = async () => {
      try {
        if (requiredPage === "complaint") {
          var response = await GetComplaints(token);
        } else {
          var response = await GetReviews(token);
        }
        console.log(
          response,
          "   this is consoling for check the response whether complaints or complaint"
        );
        setData(response.complaints);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchComplaint();
  }, [requiredPage]);

  const dataToDisplay = data.slice(
    currentPage * datPerPage,
    (currentPage + 1) * datPerPage
  );

  const handleEdit = async (value) => {
    try {
      const response = await EditComplaint(value, token);
      console.log(response, "res");
      console.log(data, "cosningthe a");
      if (response.msg === "Complaint Updated") {
        let result = data.map((value) => {
          let val = { ...value };
          if (value._id === response.complaint._id) {
            val.complaint = response.complaint.complaint;
          }
          return val;
        });
        setData(result);
        toast.success(response.msg);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const response = await makeSubmit(values, token);
      if (
        response.msg === "Complaint Created" ||
        response.msg === "Review Created"
      ) {
        toast.success(response.msg);
        setData([...data,response.complaint])
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        studentName: "",
        studentClass: "",
        studentDivision: "",
        teacherName: "",
        teacherSubject: "",
        complaint: "",
      },
      validationSchema: complaintValidation,
      onSubmit,
    });

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleModalClick = (data) => {
    setCurrentData(data);
    setIson(true);
  };

  return (
    <div>
      {ison && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <TeacherComplaintEdit
            setIson={setIson}
            requiredPage={requiredPage}
            currentData={currentData}
            handleEdit={handleEdit}
          />
        </div>
      )}
      <ToastContainer />
      <div className="md:ml-64 p-4">
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-1/2 bg-violet-200 m-2 items-center justify-center  rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                {requiredPage === "complaint"
                  ? "Make Complaint"
                  : "Make Reivew"}
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
            <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
              {/* Complaints */}
              {requiredPage === "complaint" ? "Complaints" : "Reivews"}
            </p>
            <div class="mb-3 mx-10">
              <input
                type="search"
                class="relative m-0 block w-full min-w-0 flex-auto rounded-md bg-gray-100 shadow-2xl bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-gray-700 dark:placeholder:text-gray-700 dark:focus:border-primary"
                id="exampleSearch"
                placeholder="Search"
              />
            </div>
            {loading && <Loader />}
            <div className="grid grid-cols-2">
              {dataToDisplay.map((data, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => handleModalClick(data)}
                    class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                  >
                    <div class=" text-gray-500">
                      <RiNewspaperFill className="w-10 h-10" />

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

                      <p class="mt-4 text-sm font-bold text-gray-900  sm:text-sm w-full underline underline-offset-8">
                        {data.studentId.name}
                      </p>

                      <p class="mt-2 hidden text-sm sm:block truncate max-w-sm">
                        by : {data.teacherId.name}
                        {`(${data.teacherId.subject})`}
                      </p>
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
              pageCount={Math.ceil(data.length / datPerPage)}
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

export default TeacherComplaints;
