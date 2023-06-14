import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import TeacherAddStudent from "./TeacherAddStudent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  GetStudents,
  addStudent,
  weeklyTasks,
} from "../../../axios/services/TeacherSrevices/teacherServices";

const TeacherStudetns = () => {
  const teacherData = useSelector((state) => state.teacherReducer.teacher);
  const token = teacherData?.token;

  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentStudent,setCurrentStudent] = useState('')
  const [students, setStudents] = useState([]);
  const [loading,setLoading] = useState(false)
  const taskPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetStudents(token);
        if (
          response.msg === "jwt malformed" ||
          response.msg == "Access Denied" ||
          response.msg === "jwt Expired"
        ) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setStudents(response.students);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log("error occured in the try catch block");
      }
    };
    fetchData();
  }, []);

  //function for handle the submit and calling the student creation function and updating the state
  const handleAddStudent = async(value)=>{
    try{
      setLoading(true)
      const response = await addStudent(token,value)
      console.log(response)
      if(response.msg === "jwt"){
        navigate("/teacher/login")
      }else if(response.msg === "Student Updated"){
        console.log(response)
        toast.success(response.msg)
        setStudents(students.map((data)=>{
          if(data?._id === response?.students._id ){
            return response.students
          } else{
            return data
          }
        }))
      }else if(response.msg === "Student Created"){
        console.log(response.students)
        toast.success(response.msg)
        setStudents([...students,response.student])
      }else{
        toast.error(response.msg)
      }
    }catch(error){
      console.log(error)
    }
    setLoading(false)
  }

  //function for the modal opening and closing
  const handleAddClick = () => {
    setIsOn(true);
  };

  //function for setting the current student in the student state 
  const handleStudent = (student)=>{
    setCurrentStudent(student)
  }

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
      <ToastContainer/>
      <div className="md:ml-64">
        {isOn && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
         <TeacherAddStudent
           setIsOn={setIsOn} 
           loading={loading} 
           handleAddStudent={handleAddStudent}
         />
       </div>
      )}
        <div className="flex justify-between mx-5">
          <p className="underline underline-offset-4 ">Teachers</p>
          <div className="bg-violet-400 rounded-2xl mb-5 hover:bg-violet-300">
            <p onClick={handleAddClick} className="items-center p-3 ">
              Add Student
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-5 bg-violet-200 rounded-3xl m-2">
          {taskToDisplay?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={()=>handleStudent(data)}
                class="relative dark:bg-white m-5 mt-4 rounded-xl border border-gray-100  shadow-xl sm:p-5 "
              >
                <div class=" text-gray-500 flex justify-center items-start">
                  <div className="w-8/12 sm:w-6/12 px-4 ">
                    <img className="rounded-lg" src="/img/girl.jpg" alt="profile" />
                  </div>
                </div>

                <div >
                  <h3 class="mt-4 text-sm font-bold text-gray-900 sm:text-sm">
                    name : {data.name}
                  </h3>

                  <p class="mt-2 hidden text-sm sm:block">
                    email : {data.email}
                  </p>
                  <p class="mt-2 hidden text-sm sm:block">
                    phone : {data.phone}
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
