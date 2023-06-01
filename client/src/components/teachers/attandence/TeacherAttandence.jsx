import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import {GetStudents,MarkAttandence} from "../../../axios/services/TeacherSrevices/teacherServices"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherAttandence = () => {

    const teacherData = useSelector(state => state.teacherReducer.teacher)
    const token = teacherData?.token

    const [students,setStudents] = useState([])

    const handleAttandence = async(event,data)=>{
      const formData = {
        status:event.target.value,
        student:data
      }
      const response = await MarkAttandence(token,formData)
      console.log(response)
    }
    
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
    
  return (
    <>
      <div className="flex m-3">
        <div className=" w-2/3 bg-teal-100 m-2 rounded-2xl">
          <div className="m-5">
            <p className="text-center underline underline-offset-8">
              Mark Attandence
            </p>
          </div>
          <div>

            {students.map((data)=>(
                 <div className="gap-4 m-5 ">
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
                         name="attandence"
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
                         name="attandence"
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
            
          </div>
        </div>
        <div className=" w-1/3 bg-yellow-200 m-2">first siv</div>
      </div>
    </>
  );
};

export default TeacherAttandence;
