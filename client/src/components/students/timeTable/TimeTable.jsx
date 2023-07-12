import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GetTimeTable } from "../../../axios/services/studentServices/studentServices";
import Loader from "../../landing/loader/Loader";

const TimeTable = () => {
  const studentData = useSelector((state) => state.studentReducer);
  const token = studentData?.token;

  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState("");
  const [loading,setLoading] = useState(false)

  const errMsgs = ["jwt expired", "Acces Denied"];

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true)
        const response = await GetTimeTable(token);
        if (
          errMsgs.some((msg) => msg === response.msg || msg === errMsgs.message)
        ) {
          navigate("/login");
        } else if (response?.timeTable) {
          setTimeTable(response?.timeTable);
        } else {
          toast.error(response.msg)
        }
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    };
    fetchData();
  },[]);


  return (
    <div>
      <ToastContainer />
      <div>
        <div className="p-4 sm:ml-64">
        {loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <Loader />
            </div>
          )}
          <div className="text-3xl underline underline-offset-8  flex">
            Time Table
          </div>
        </div>

        <div class="p-4 sm:ml-64">
          <div class="p-4 border-2 border-gray-100  rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-6 gap-4 mb-4">
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                  9:00 - 9:45 
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                   9:45 - 10:30 
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                   10:45 - 11:30 
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                   11:30 - 12:15 
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                   2:00 - 2:45 
                </p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-900 dark:text-gray-900">
                   3:00 - 3:30 
                </p>
              </div>
            </div>
            <div class="flex items-center justify-center  mb-4 rounded bg-gray-100 ">
              {timeTable ? (
                <>
                  <div className="">
                    <img src={timeTable} alt="time Table" className="m-5" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center m-10 text-red-600">
                    Not Added Yet
                  </p>
                </>
              )}
            </div>
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
