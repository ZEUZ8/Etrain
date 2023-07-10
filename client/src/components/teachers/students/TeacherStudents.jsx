import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import TeacherAddStudent from "./TeacherAddStudent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CreateTeacherConversation,
  GetStudents,
  addStudent,
  weeklyTasks,
} from "../../../axios/services/TeacherSrevices/teacherServices";

const TeacherStudetns = () => {
  const teacherData = useSelector((state) => state.teacherReducer);
  const token = teacherData?.token;
  const teacherId = teacherData?.id;

  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentStudent, setCurrentStudent] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const taskPerPage = 10;
  const errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetStudents(token);
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setStudents(response.students);
          setCurrentTeacher(response.teacher);
        }
      } catch (error) {
        console.log("error occured in the try catch block");
      }
    };
    fetchData();
  }, []);

  //function for handle the submit and calling the student creation function and updating the state
  const handleAddStudent = async (value) => {
    try {
      setLoading(true);
      const response = await addStudent(token, value);
      if (response.msg === "jwt") {
        navigate("/teacher/login");
      } else if (response.msg === "Student Updated") {
        toast.success(response.msg);
        setStudents(
          students.map((data) => {
            if (data?._id === response?.students._id) {
              return response.students;
            } else {
              return data;
            }
          })
        );
      } else if (response.msg === "Student Created") {
        toast.success(response.msg);
        setStudents([...students, response.student]);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
    setIsOn(false);
    setLoading(false);
  };

  //function for starting an conversatiokn between the teacer and the  students
  const handleClick = async (userId) => {
    try {
      const response = await CreateTeacherConversation(
        token,
        teacherId,
        userId
      );
      if (errorMsgs.some((msg) => msg === response.msg || response.message)) {
        navigate("/teacher/login");
      } else if (response.msg === "ConvCreated") {
        navigate("/teacher/chat");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //function for setting the current student in the student state
  const handleStudent = (student) => {
    setCurrentStudent(student, "the user id");
  };

  //innorder to use the pagination we have to set the data into this format
  const taskToDisplay = students.slice(
    currentPage * taskPerPage,
    (currentPage + 1) * taskPerPage
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
      <ToastContainer />
      <div className="md:ml-64">
        {isOn && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <TeacherAddStudent
              setIsOn={setIsOn}
              loading={loading}
              handleAddStudent={handleAddStudent}
              currentTeacher={currentTeacher}
            />
          </div>
        )}

        <div className="flex justify-between mx-5">
          <p className="underline underline-offset-4 ">Students</p>
          <div className="bg-violet-400 rounded-2xl mb-5 hover:bg-violet-300 ml-3">
            <p onClick={() => setIsOn(true)} className="items-center p-3 ">
              Add Student
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-5 bg-violet-200 rounded-3xl m-2">
          {taskToDisplay?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => handleStudent(data)}
                class="relative dark:bg-white m-5 mt-4 rounded-xl border border-gray-100  shadow-xl sm:p-5 "
              >
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={() => handleClick(data?._id)}
                >
                  <AiFillWechat />
                </div>
                <div class=" text-gray-500 flex justify-center items-start">
                  <div className="w-8/12 sm:w-6/12 px-4 ">
                    <img
                      className="rounded-lg"
                      src="/img/girl.jpg"
                      alt="profile"
                    />
                  </div>
                </div>

                <div>
                  <h3 class="mt-4 text-sm font-bold text-gray-900 sm:text-sm">
                    name : {data?.name}
                  </h3>

                  <p class="mt-2 hidden text-sm sm:block">
                    email : {data?.email}
                  </p>
                  <p class="mt-2 hidden text-sm sm:block">
                    phone : {data?.phone ? data?.phone : "Not povided"}
                  </p>
                </div>
                {/* 
                <span
                  class="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                >
                  4.3
                </span> */}
              </div>
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
          pageCount={Math.ceil(students.length / taskPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          // containerClassName={'pagination'}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default TeacherStudetns;
