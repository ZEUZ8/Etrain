import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ReactPaginate from 'react-paginate';
import "react-toastify/dist/ReactToastify.css";


import PrincipalTeacherEdit from "./PrincipalTeacherEdit";
import { updateTeacher,classes,teachers,addNewTeacher } from "../../../axios/services/principalServices/principlaServices";
import PrincipalAddTeacher from "./PrincipalAddTeacher";
import Loader from "../../landing/loader/Loader"


const PrincipalTeachers = () => {

  const principalData = useSelector(state => state.principalReducer.principal)
  const token = principalData?.token
  const navigate = useNavigate()
  const [ison,setIson] = useState(false)
  const [addTeacher,setAddTeacher] = useState(false)
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [currentTeacher,setCurrentTeacher] = useState('')
  const [existingTeachers,setExistingTeachers] = useState([])
  const [currentPage,setCurrentPage] = useState(0)
  const taskPerPage = 6;



  useEffect(()=>{
    setLoading(true)
    const fetchData = async()=>{
      try{
        const respons = await teachers(token)
        if(respons === "Access Denied" || respons.message === "jwt malformed" || respons.message === "jwt expired"){
          navigate("/principal/login")
        }else{
          console.log(respons)
          setExistingTeachers(respons.teachers)
        }
      }catch(error){
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  },[])


  useEffect(()=>{
    setLoading(true)
    const fetchData =  async ()=>{
      try{
        const respons = await classes(token)
        if(respons === "Access Denied" || respons.message === "jwt malformed" || respons.message === "jwt expired"){
          navigate("/principal/login")
        }else {
          console.log(respons.classes)
          setData(respons.classes)
        }
      }catch(error){
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  },[])

  const uniqueClass = [...new Set(data?.map(item => item.className))]

  //function for handling the Add Teacher submit and calling the teacher creating function and 
  const handleAddTeacherSubmit = async(value)=>{
    try{
      setLoading(true)
      const response = await addNewTeacher(token,value)
      if(response === "Access Denied" || response.message === "jwt malformed" || response.message === "jwt expired"){
        navigate("/principal/login")
      }else if(response.msg === "succesfull"){
        toast.success(response.msg)
        setAddTeacher(false)
      }else{
        toast.error(response.msg)
      }
    }catch(error){
      console.log(error)
    }
    setLoading(false)
  }

  //function for the handle the modal opening from both childe and parent component
  const handelEdit = (teacher) => {
    setCurrentTeacher(teacher)
    setIson(true)
  };

  //handling the teacher updation section in the child component 
  const handleUpdation = async(formDatat)=>{
    formDatat.teacherId = currentTeacher._id
    if(formDatat.className === "Not Assigned" || formDatat.className === ''){
      formDatat.className = 0
    }
    console.log(formDatat)
    try{
      const result = await updateTeacher(token,formDatat)
      console.log(result,"checking the result")
      if(result == "Access Denied" || result.message === "jwt malformed"){
       navigate("/principal/login")
      }else if(result === "class not found"){
        toast.error(result)
        // setExistingTeachers([...existingTeachers,setExistingTeachers])
      }else{
        // setExistingTeachers((existingTeachers)=>{
        //   return existingTeachers.map((teacher)=>{
        //     return teacher._id === result.teacher._id ? result.teacher : teacher
        //   })
        // })
        setExistingTeachers((existingTeachers) => {
          return existingTeachers?.map((teacher) => {
            return teacher?._id === result.teacher?._id ? result.teacher : teacher;
          });
        });

        // console.log(existingTeachers)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleAddTeacher = async ()=>{
    console.log("entere in the add teacher section")
    setAddTeacher(true)
  }

  const taskToDisplay = existingTeachers.slice(
    currentPage * taskPerPage,
    (currentPage + 1 ) * taskPerPage
  )
  
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
      {ison && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <PrincipalTeacherEdit setIson={setIson} data={uniqueClass} oldData={data} handleUpdation={handleUpdation}/>
            </div>
        )}
      {addTeacher && (
         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
         <PrincipalAddTeacher
           setAddTeacher={setAddTeacher} loading={loading} handleAddTeacherSubmit={handleAddTeacherSubmit}
         />
       </div>
      )}
      <div className="p-4 sm:ml-64 h-full align-middle">
        <div className="flex justify-between mx-5">
          <p className="underline underline-offset-4 ">Teachers</p>
          <div className="bg-fuchsia-300 rounded-2xl mb-5 hover:bg-fuchsia-400">
            <p onClick={handleAddTeacher} className="items-center p-3 ">Add Teacher</p>
          </div>
        </div>
        <section className="bg-fuchsia-100 rounded-3xl bottom-10">
          <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          {loading&& <Loader/>}
            <div class="grid  gap-4 sm:grid-cols-3">
              {/* {data.map((item)=>(  */}
              {taskToDisplay?.map((item)=>(
              <a 
                key={item._id}
                class="block rounded-xl border border-gray-500 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                onClick={()=>handelEdit(item)}
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-900 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>

                {/* <h2 class="mt-2 font-bold">Class: {item.className+" "+item.division}</h2> */}
                <h2 class="mt-2 font-bold">{item.name}</h2>

                {/* <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                Class Teacher :  {item.classTeacher?item.classTeacher:"Not Assigned"}
              </p> */}

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Class : {item.class && item.division ? item.class +" "+ item.division : "Not Assigned"}
                </p>
                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Status : {item.approved?"Approved":"Not Approved"}
                </p>
              </a>
              ))}
              {/* ))} */}
            </div>
            <ReactPaginate 
                containerClassName="flex justify-center items-center mt-5"
                pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
                previousLinkClassName="  text-white font-bold py-3 px-1 "
                nextLinkClassName="  text-white font-bold py-3 px-1 "
                previousLabel={<GrFormPrevious name="arrow-left" />}
                nextLabel={< GrFormNext name="arrow-right" />}
                breakLabel={'...'}
                pageCount={Math.ceil(existingTeachers.length / taskPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                // containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
          </div>
        </section>

        <ToastContainer />
      </div>
 
    </>
  );
};

export default PrincipalTeachers;
