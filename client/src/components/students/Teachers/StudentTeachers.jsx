import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../../landing/loader/Loader";
import { CreateStudentConversation, GetTeachers } from "../../../axios/services/studentServices/studentServices";

const StudentTeachers = () => {
  const studentData = useSelector((state) => state.studentReducer);
  const token = studentData?.token;
  const teacherId = studentData?.id

  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentStudent,setCurrentStudent] = useState('')
  const [teachers, setTeachers] = useState([]);
  const [loading,setLoading] = useState(false)
  const taskPerPage = 10;
  const errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"]

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try {
        const response = await GetTeachers(token);
        if (errorMsgs.some((msg)=>msg === response.msg)){
          navigate("/teacher/login");
        } else if (response) {
          setTeachers(response);
        } 
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    };
    fetchData();
  }, []);


  //function for starting an conversatiokn between the teacer and the  students
  const handleClick = async(userId)=>{
    try{
        setLoading(true)
      const response = await CreateStudentConversation(token,teacherId,userId)
      if(errorMsgs.some(msg => msg === response.msg || response.message)){
        navigate("/login")
      }else if(response.msg === "ConvCreated" || response.msg === "ConvFinded"){
        navigate("/chat")
      }
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  //function for setting the current student in the student state 
  const handleStudent = (student)=>{
    setCurrentStudent(student)
  }

  //innorder to use the pagination we have to set the data into this format
  const taskToDisplay = teachers.slice(
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
        {loading && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Loader/>
       </div>
      )}
        <div className="flex justify-between m-5">
          <p className="underline underline-offset-4 ">Teachers</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-5 bg-violet-200 rounded-3xl m-2">
          {taskToDisplay?.map((data, index) => {
            return (
              <div
                key={index}
                onClick={()=>handleStudent(data)}
                class="relative dark:bg-white m-5 mt-4 rounded-xl border border-gray-100  shadow-xl sm:p-5 "
              >
                <div className="flex justify-end cursor-pointer" onClick={()=>handleClick(data?._id)}>
                   <AiFillWechat/> 
                </div>
                <div class=" text-gray-500 flex justify-center items-start">
                  <div className="w-8/12 sm:w-6/12 px-4 ">
                    <img className="rounded-lg" src="/img/girl.jpg" alt="profile" />
                  </div>
                </div>

                <div >
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
          pageCount={Math.ceil(teachers.length / taskPerPage)}
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

export default StudentTeachers;
