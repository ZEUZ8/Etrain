import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieGraph } from "../../landing/graph/graph";

import { useSelector } from "react-redux";
import { PrincipalAllAttendance } from "../../../axios/services/principalServices/principlaServices";

const DashBoard = () => {
  const principalData = useSelector(
    (state) => state.principalReducer
  );
  const token = principalData?.token;

  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await PrincipalAllAttendance(
          token,
          selectedDate.toDateString()
        );
        if (response && response.length > 0) {
          setAttendance(response)
        }else{
          setAttendance('')
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedDate]);


  return (
    <div>
      <div>
        <ToastContainer />
        <div class="p-4 sm:ml-64">
          <div class="p-4  border-gray-200 rounded-lg dark:border-gray-700">
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center justify-center rounded-[1rem]  bg-gray-50 h-[30rem] dark:bg-sky-100 p-5">
                {attendance ? <PieGraph attendance={attendance} /> : 
                <>
                 <div>
                  <p className="text-lg font-bold">Not Marked on this Date</p>
                 </div>
                </>}
              </div>

              <div class="w-full flex-col flex justify-start p-10  items-center rounded-2xl bg-gray-50 h-[30rem] dark:bg-sky-100">
                <div className="inline-block m-10 underline underline-offset-4">
                  Select A Date
                </div>
                <div className=" bg-white rounded-xl p-3 w-fit">
                  <Calendar
                    className="h-fit w-fit"
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
