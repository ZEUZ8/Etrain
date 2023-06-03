import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import {GetStudents,MarkAttandence} from "../../../axios/services/TeacherSrevices/teacherServices"
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherAttandence = () => {

    const teacherData = useSelector(state => state.teacherReducer.teacher)
    const token = teacherData?.token

    const [students,setStudents] = useState([])
    const [marking,setMarking] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const taskPerPage = 6

    const handleSubmit = async()=>{
      try{
        const response = await MarkAttandence(token,marking)
        if(response.msg === "Marked succesfully"){
          toast.success(response.msg)
        }else{
          toast.error(response.msg)
        }
      }catch(error){
        console.log(error)
      }
    }
    const handleAttandence = async(event,data)=>{

      // console.log(event.target.value,'eve',data)
      const formData = {
        status:event.target.value,
        student:data
      }
      console.log(formData)
      setMarking([...marking,formData])
      // console.log(compare)
      // setMarking((marking)=>{
        //   const updatedMark = marking.map((marks)=>{
          //     if(marks.student._id === formData.student._id){
            //       return{
              //         ...marks,
              //         status:formData.status
              //       }
              //     }
              //     return marks
              //   })
              //   return updatedMark
              // })
            }
            // console.log(marking,"consoling")
            
            console.log(marking)
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await GetStudents(token) 
                if(response.msg === "succesfull"){
                    setStudents(response.students)
                }else{
                    console.log(response.msg)
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])

    const taskToDisplay = students.slice(
      currentPage * taskPerPage,
      (currentPage + 1) * taskPerPage
    )

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };
    
  return (
    <>
    < ToastContainer />
      <div className="flex m-3">
        <div className=" w-full bg-teal-100 m-2 rounded-2xl">
          <div className="m-5 flex justify-between">
            <p className="text-center underline underline-offset-8">
                Mark Attandence
              </p>
            <div className="flex ">
              <Link >
                <div  className="bg-violet-400 w-full flex justify-center shadow-2xl h-max rounded-2xl p-2  text-white">Previouse</div>
              </Link>
              <div onClick={handleSubmit} className="bg-violet-400 w-full flex justify-center shadow-2xl h-max ml-3 rounded-2xl p-2 text-white">Submit</div>
            </div>
          </div>
          <div>

            {taskToDisplay.map((data,index)=>(
                 <div key={index} className="gap-4 m-5 ">
                 <div className="bg-white rounded-md flex justify-between align-middle items-center">
                   <div className="ml-5">
                       {data.name}
                   </div>
   
                   <div className="mr-5 m-3 flex">
                     <div class="flex items-center mr-4">
                       <input
                         class="w-4 h-4   dark:bg-gray-700 dark:border-gray-600"
                         id="inline-checkbox"
                         type="radio"
                         name={data._id}
                         value="present"
                         onChange={(event)=>handleAttandence(event,data)}
                       />
                       <label
                         for="inline-checkbox"
                         class="ml-2 text-sm font-medium text-gray-900 dark:text"
                       >
                         Present
                       </label>
                     </div>
                     <div class="flex items-center mr-4">
                       <input
                         class="w-4 h-4   dark:bg-gray-700 dark:border-gray-600"
                         id="inline-2-checkbox"
                         type="radio"
                         name={data._id}
                         value="absent"
                         onChange={(event)=>handleAttandence(event,data)}
                       />
                       <label
                         for="inline-2-checkbox"
                         class="ml-2 text-sm font-medium text-gray-900 dark:text"
                       >
                         Absent
                       </label>
                     </div>
                   </div>

                 </div>
               </div>
            ))}
             <ReactPaginate 
                containerClassName="flex justify-center items-center mt-5"
                pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
                previousLinkClassName="  text-white font-bold py-3 px-1 "
                nextLinkClassName="  text-white font-bold py-3 px-1 "
                previousLabel={<GrFormPrevious name="arrow-left" />}
                nextLabel={< GrFormNext name="arrow-right" />}
                breakLabel={'...'}
                pageCount={Math.ceil(students.length / taskPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                // containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            
          </div>
        </div>
        {/* <div className=" w-1/3 bg-violet-100 rounded-2xl m-2">
          <div class="m-5">
            <p className="text-center underline underline-offset-8 ">Attandence</p>
          </div> */}
          
            {/* <div className="flex  m-5">
              <div className="bg-red-500 w-full h-max flex  rounded-2xl p-2 text-white">Submit</div>
            </div> */}

         

          {/* <div className="flex justify-center m-5 mx-10">
            <div className="bg-orange-500 w-full flex justify-center shadow-2xl h-max rounded-2xl p-2 text-white">View More</div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default TeacherAttandence;
