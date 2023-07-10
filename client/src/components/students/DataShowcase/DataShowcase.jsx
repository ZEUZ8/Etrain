import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { RiNewspaperFill } from "react-icons/ri";
import Loader from "../../landing/loader/Loader";
import "react-toastify/dist/ReactToastify.css";

import {
  GetExams,
  GetComplaints,
  GetReviews,
} from "../../../axios/services/studentServices/studentServices";
import StudentCreateComplaint from "./StudentCreateComplaint";

const DataShowcase = ({ page }) => {
  const navigate = useNavigate();
  const studentData = useSelector((state) => state.studentReducer);
  const token = studentData?.token;

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState("");
  const [data, setData] = useState([]);
  const [isOn,setIsOn] = useState(false)

  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [exams, setExams] = useState([]);

  const errMsgs = ["Access Denied","jwt malformed","jwt expired"]

  const datPerPage = 4;

  useEffect(() => {
    setLoading(true);
    setCurrentData("");
    const fetchComplaint = async () => {
      try {
        if (page === "complaints") {
          const response = await GetComplaints(token);
          if (
            response?.msg === "Access Denied" ||
            response?.msg === "jwt malformed" ||
            response?.msg?.msg === "jwt expired"
          ) {
            navigate("/login");
          } else if (response?.msg === "succesfull") {
            setComplaints(response?.complaints);
          } else {
            toast?.error(response?.error);
          }
        } else if (page === "reviews") {
          const response = await GetReviews(token);
          if (
            response?.msg === "Access Denied" ||
            response?.msg === "jwt malformed" ||
            response?.msg?.msg === "jwt expired"
          ) {
            navigate("/login");
          } else if (response?.msg === "succesfull") {
            setReviews(response?.reviews);
          } else {
            toast?.error(response?.msg);
          }
        } else if (page === "exams") {
          const response = await GetExams(token, studentData?.id);
          if (
            response?.msg === "Access Denied" ||
            response?.msg === "jwt malformed" ||
            response?.msg?.msg === "jwt expired"
          ) {
            navigate("/login");
          } else if (response?.msg === "succesfull") {
            setExams(response?.exams);
          } else {
            console?.log("enterd the inthe laskdf");
            toast?.error(response?.msg);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchComplaint();
  }, [page]);

  let paginationPage;
  let paginationState;

  if (page === "complaints") {
    paginationPage = complaints;
    paginationState = complaints;
  } else if (page === "reviews") {
    paginationPage = reviews;
    paginationState = reviews;
  } else if (page === "exams") {
    paginationPage = exams;
    paginationState = exams;
  }

  const dataToDisplay = paginationState?.slice(
    currentPage * datPerPage,
    (currentPage + 1) * datPerPage
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage?.selected);
  };

  const handleModalClick = (data) => {
    setCurrentData(data);
  };


  return (
    <div>
      {/* {ison && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <TeacherComplaintEdit
            setIson={setIson}
            page={page}
            currentData={currentData}
            handleEdit={handleEdit}
          />
        </div>
      )} */}
      <ToastContainer />
      <div className="md:ml-64 p-4">
        {page === "complaints" && (
          <div className="flex justify-end mx-5">
            <div className="bg-fuchsia-300 rounded-2xl mb-5 hover:bg-fuchsia-400">
              <p onClick={()=>setIsOn(true)} className="items-center p-3 ">
                Make Complaint
              </p>
            </div>
          </div>
        )}
        {isOn && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <StudentCreateComplaint setIsOn={setIsOn} />
            </div>
        )}
        <div className="flex justify-center flex-col md:flex-row">
          <div className="flex w-1/2 bg-left-gradient m-2 items-center justify-center   rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text-white underline underline-offset-4">
                Show Details
              </p>
              <div className="w-full">
                {currentData ? (
                  <form className="bg-white shadow-md  px-8 pt-6 pb-10 mb-10 rounded-xl">
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
                        readOnly
                        type="text"
                        placeholder={
                          currentData?.examName
                            ? currentData?.examName
                            : currentData?.studentId?.name
                        }
                        name="name"
                      />
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
                          placeholder={currentData?.studentId?.studentClass}
                          name="studentClass"
                          readOnly
                        />
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
                          placeholder={currentData?.studentId?.division}
                          name="studentDivision"
                          readOnly
                        />
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
                          placeholder={currentData?.teacherId?.name}
                          name="teacherName"
                          readOnly
                        />
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
                          placeholder={currentData?.teacherId?.subject}
                          name="TecherSubject"
                          readOnly
                        />
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
                        readOnly
                        name="complaint"
                        placeholder={
                          currentData?.examDiscription
                            ? currentData?.examDiscription
                            : currentData?.review
                            ? currentData?.review
                            : currentData?.complaint
                        }
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-center">
                      {/* <button
                    className="bg-left-gradient hover:bg-rose-400 w-full mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create
                  </button> */}
                      {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a> */}
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="dark:text-white text-center sm:text-lg lg:text-2xl mt-5">
                      <p className="dark:text-white sm:text-lg lg:text-2xl mt-5 ">
                        Select A {page}
                      </p>
                    </div>
                    <div className="flex justify-center items-center align-middle">
                      <img
                        className="dark:text-white rounded-2xl h-fit w-full"
                        src="/img/select.svg"
                        alt="Not selected"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-left-gradient m-2 h-fit rounded-2xl shadow-2xl">
            <p className="text-center text-xl  m-5 dark:text-white underline underline-offset-4">
              {/* Complaints */}
              {page}
            </p>
            <div class="mb-3 mx-10">
              <input
                readOnly
                type="search"
                class="relative m-0 block w-full min-w-0 flex-auto rounded-md bg-gray-100 shadow-2xl bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-gray-700 dark:placeholder:text-gray-700 dark:focus:border-primary"
                id="exampleSearch"
                placeholder="Search"
              />
            </div>
            {loading && <Loader />}
            {dataToDisplay?.length > 0 ? (
              <div className="grid grid-cols-2">
                {dataToDisplay?.map((data, index) => {
                  if (page === "complaints") {
                    return (
                      <a
                        key={index}
                        onClick={() => handleModalClick(data)}
                        class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                      >
                        <div class=" text-gray-500">
                          <RiNewspaperFill className="w-10 h-10" />
                          <p class="mt-4 text-sm font-bold text-gray-900  sm:text-sm w-full underline underline-offset-8">
                            {data?.studentId?.name}
                          </p>
                          <p class="mt-2 hidden text-sm sm:block truncate max-w-sm">
                            by : {data?.teacherId?.name}
                            {`(${data?.teacherId?.subject})`}
                          </p>
                        </div>
                      </a>
                    );
                  } else if (page === "reviews") {
                    return (
                      <a
                        key={index}
                        onClick={() => handleModalClick(data)}
                        class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                      >
                        <div class=" text-gray-500">
                          <RiNewspaperFill className="w-10 h-10" />
                          <p class="mt-4 text-sm font-bold text-gray-900  sm:text-sm w-full underline underline-offset-8">
                            {data?.studentId?.name}
                          </p>
                          <p class="mt-2 hidden text-sm sm:block truncate max-w-sm">
                            by : {data?.teacherId?.name}
                            {`(${data?.teacherId?.subject})`}
                          </p>
                        </div>
                      </a>
                    );
                  } else if (page === "exams") {
                    return (
                      <a
                        key={index}
                        onClick={() => handleModalClick(data)}
                        class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                      >
                        <div class=" text-gray-500">
                          <RiNewspaperFill className="w-10 h-10" />
                          <p class="mt-4 text-sm font-bold text-gray-900  sm:text-sm w-full underline underline-offset-8">
                            Exam : {data?.examName}
                          </p>
                          <p class="mt-4 text-sm font-bold text-gray-900  sm:text-sm w-full underline underline-offset-8">
                            Class : {data?.examClass}
                          </p>
                          <p class="mt-2 hidden text-sm sm:block truncate max-w-sm">
                            {/* from : {data.startDate} to : {data.endDate} */}
                          </p>
                        </div>
                      </a>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="">
                <div className="text-center">
                  <p className="dark:text-white sm:text-lg lg:text-2xl mt-5 underline underline-offset-4">
                    Don't Have any {page}
                  </p>
                </div>
                <div className="flex justify-center items-center m-5  rounded-2xl">
                  <img
                    className="dark:text-white rounded-2xl h-[30rem] w-full"
                    src="/img/No data-rafiki.svg"
                    alt="NoData"
                  />
                </div>
              </div>
            )}
            {dataToDisplay.length > 0 && (
              <div>
                <ReactPaginate
                  containerClassName="flex justify-center items-center mt-5 "
                  pageLinkClassName="bg-violet-500  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
                  previousLinkClassName="  text-white font-bold py-3 px-1 "
                  nextLinkClassName="  text-white font-bold py-3 px-1 "
                  previousLabel={<GrFormPrevious name="arrow-left" />}
                  nextLabel={<GrFormNext name="arrow-right" />}
                  breakLabel={"..."}
                  pageCount={Math.ceil(paginationPage.length / datPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  // containerClassName={'pagination'}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataShowcase;
