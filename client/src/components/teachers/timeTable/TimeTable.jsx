import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

import { GetTimeTable } from "../../../axios/services/TeacherSrevices/teacherServices";

const TimeTable = () => {
  const teacherData = useSelector((state) => state.teacherReducer);
  const token = teacherData?.token;

  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState('');
  const [image,setImage] = useState('')

  const errMsgs = ["jwt expired", "Acces Denied"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetTimeTable(token);
      if (
        errMsgs.some((msg) => msg === response.msg || msg === errMsgs.message)
      ) {
        navigate("/teacher/login");
      } else if (response?.timeTable) {
        setTimeTable(response?.TimeTable);
      } else {
      }
    };
    fetchData();
  });


  const handleChange = async(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      setImage(reader.result)
    }
    try{
      const response = await updateTimeTable(image)
      if(errMsgs.some((msg)=> msg === response?.msg || response?.message)){
        navigate("/teacher/login")
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <div className="p-4 sm:ml-64">
          <div className="text-3xl underline underline-offset-8  flex">
            Time Table
          </div>
        </div>

        <div class="p-4 sm:ml-64">
          <div class="p-4 border-2 border-gray-100  rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-6 gap-4 mb-4">
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                  period Time
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center h-[30rem] mb-4 rounded bg-gray-100 ">
             
              {timeTable ? (
                <>
                <FiEdit className="cursor-pointer h-5 w-5 ml-1 " />
                <img src="" alt="" />
                </>
              ) : (
                <input type="file" onChange={handleChange} />
              )}
            </div>
            {/* <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div> */}
            {/* <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
