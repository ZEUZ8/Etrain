import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiPaperTray } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import PrincipalShowLeave from "./PrincipalShowLeave";

import { GetLeaves } from "../../../axios/services/principalServices/principlaServices";

const PrincipalLeave = () => {
  const principalData = useSelector(
    (state) => state.principalReducer
  );
  const token = principalData?.token;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userLeaves, setUserLeaves] = useState([]);
  const [currentLeave, setCurrentLeave] = useState("");
  const [isOn, setIsOn] = useState(false);
  
  let errorMsgs = ["Access Denied", "jwt malformed", "jwt expired"];

  useEffect(() => {
    //function for finding all the leves
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetLeaves(token);
        if (errorMsgs.some((msg) => msg === response.msg || response.message)) {
          navigate("/principal/login");
        } else if (response.msg === "succesfull") {
          setUserLeaves(response.leaves);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  //function for the modal opening and the passing the all the data that required
  const handleQueryClick = async (data) => {
    setCurrentLeave(data)
    setIsOn(true)
  };

  return (
    <div>
      <ToastContainer />
      <div className="md:ml-64 p-4">
        {isOn && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <PrincipalShowLeave
              setIsOn={setIsOn}
              loading={loading}
              currentLeave={currentLeave}
            />
          </div>
        )}
        <div className="flex justify-center flex-col md:flex-row">
          {/* <div className="flex w-1/2 bg-violet-200 m-2 items-center justify-center h-fit rounded-3xl shadow-xl">
            <div className="h-full w-">
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Scheduled Exams
              </p>
              {exams?.length > 0 ? (
                <div className="grid grid-cols-2">
                  {exams?.map((exam, index) => {
                    return (
                      <a
                        key={index}
                        onClick={() => handleEditClick(exam)}
                        class="relative flex items-start justify-between dark:bg-white m-5 mt-4 rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"
                      >
                        <div class=" text-gray-500">
                          <GiPaperTray className="w-10 h-10" />

                          <h3 class="mt-4 text-sm font-bold text-gray-900  sm:text-md w-full">
                            Name : {exam.examName}
                          </h3>
                          <h3 class="mt-4 text-sm font-bold text-gray-900  sm:text-md w-full">
                            Class : {exam.examClass}
                          </h3>

                    
                        </div>

                      </a>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p className="text-center">No Exam Found</p>
                  <img src="/img/No data-amico.svg" alt="no Exam found" />
                </div>
              )}
            </div>
          </div> */}

          <div className="w-1/2 bg-violet-200 m-2 h-fit rounded-2xl shadow-2xl">
            <div>
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Teacher Leaves
              </p>
              {userLeaves?.length > 0 ? (
                <div className="h-[35rem] overflow-y-scroll ">
                  <div className="grid grid-cols-1 sm:h-fit">
                    {userLeaves?.map((data, index) => {
                      if (data.user === "teacher") {
                        return (
                          <a
                            key={index}
                            onClick={() => handleQueryClick(data)}
                            class="relative items-start justify-between dark:bg-white m-5 rounded-xl border border-gray-100 p-1 shadow-xl sm:p-1 lg:p-3 h-fit"
                          >
                            <div className="flex ps-5 justify-between">
                              <div className="flex">
                                <img
                                  src="/img/girl.jpg"
                                  alt="image"
                                  className="h-8 w-8 rounded-3xl"
                                />
                                <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                                  {data?.teacherId?.name}{` (${data?.teacherId?.class}${data?.teacherId?.division})`}
                                </h3>
                              </div>
                              <div className="">
                                <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                                  {`From - ${new Date(
                                    data?.startDate
                                  ).toLocaleDateString()}`}{" "}
                                  {`   To - ${new Date(
                                    data?.endDate
                                  ).toLocaleDateString()}`}
                                </h3>
                              </div>
                            </div>
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <p>No Student Leaves Found</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 bg-violet-200 m-2 h-fit rounded-2xl shadow-2xl">
            <div>
              <p className="text-center text-xl  m-5 dark:text underline underline-offset-4">
                Student Leaves
              </p>
              {userLeaves?.length > 0 ? (
                <div className="h-[35rem] overflow-y-scroll ">
                  <div className="grid grid-cols-1  sm:h-fit  ">
                    {userLeaves?.map((data, index) => {
                      if (data.user === "student") {
                        return (
                          <a
                            key={index}
                            onClick={() =>handleQueryClick(data)}
                            class="relative items-start justify-between dark:bg-white m-5 rounded-xl border border-gray-100 p-1 shadow-xl sm:p-1 lg:p-3 h-fit"
                          >
                            <div className="flex ps-5 justify-between">
                              <div className="flex">
                                <img
                                  src="/img/girl.jpg"
                                  alt="image"
                                  className="h-8 w-8 rounded-3xl"
                                />
                                <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                                    {console.log(data)}
                                  {data.studentId.name}{` (${data?.studentId?.studentClass}${data?.studentId?.division})`}
                                </h3>
                              </div>
                              <div className="">
                                <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                                  {`From - ${new Date(
                                    data?.startDate
                                  ).toLocaleDateString()}`}{" "}
                                  {`   To - ${new Date(
                                    data?.endDate
                                  ).toLocaleDateString()}`}
                                </h3>
                              </div>
                            </div>
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <p>No Student Leaves Found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalLeave;
