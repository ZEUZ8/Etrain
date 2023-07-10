import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../landing/loader/Loader";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

import { GetStudents } from "../../../axios/services/principalServices/principlaServices";

const EditClass = () => {

  const pricnipalData = useSelector((state) => state.principalReducer);
  const token = pricnipalData?.token;
  const principalId = pricnipalData?.id;

  const location = useLocation();
  const currentClass = location.state.data;

  const navigate = useNavigate()

  const [students,setStudents] = useState([])

  const errorMsgs = ["Access Decied", "jwt malformed", "jwt expired"]

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await GetStudents(token,currentClass?._id)
        console.log(response,'the response in the clg')
        if(errorMsgs.some(msg => msg === response.msg || response.message)){
          navigate("/principal/login")
        }else{
          setStudents(response)
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])

  return (
    <>
      <div className="md:ml-64 p-4">
        <section className="bg-fuchsia-100 rounded-3xl bottom-10 h-fit">
          <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div class="col-span-2 mb-5 ">
              <div class="p-4  rounded-xl text-gray-800">
                <div class="font-bold text-xl leading-none underline underline-offset-4 flex">
                  Class Name : {currentClass.className} {currentClass.division} <FiEdit className="cursor-pointer ml-3" />
                </div>
              </div>
            </div>

            <div class="flex">
              <div class="block h-[20rem] w-1/3 rounded-xl border border-gray-500 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-900 focus:outline-none focus:ring">
                <div className="flex justify-end">
                  <FiEdit className="cursor-pointer " />
                  <AiFillDelete className="cursor-pointer ml-3" />
                </div>
                <div className="flex justify-center m-4">
                  <span class=" justify-center rounded-lg  bg-gray-50 p-3">
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>
                </div>

                <h2 class="mt-2 font-bold flex justify-center">teacherName </h2>

                <div className="m-4 flex flex-col h-fit gap-6 justify-between">
                  <p class="hidden mt-2 sm:block sm:text-sm sm:text-gray-600 ">
                    Subject :
                  </p>
                  <p class="hidden mt-2 sm:block sm:text-sm sm:text-gray-600">
                    Email :
                  </p>
                  <p class="hidden mt-2 sm:block sm:text-sm sm:text-gray-600 ">
                    Phone :
                  </p>
                </div>
              </div>

              <div className="w-2/3">
                <div className=" border border-gray-500 p-4 shadow-sm rounded-xl mx-5 h-[40rem]">
                  <p className=" text-center pt-3 overflow-y-auto underline underline-offset-4 mb-5">
                    Students
                  </p>
                  <div className="h-[35rem] overflow-y-scroll ">
                    <div className="grid grid-cols-1  sm:h-fit  ">
                      {students?.map(data=>{
                        return(
                          <a class="relative items-start justify-between dark:bg-white m-5 rounded-xl border border-gray-100 p-1 shadow-xl sm:p-1 lg:p-3 h-fit">
                          <div className="flex ps-5 justify-between">
                            <div className="flex">
                              <img
                                src="/img/girl.jpg"
                                alt="image"
                                className="h-8 w-8 rounded-3xl"
                              />
                              <h3 className=" text-sm ps-5 mt-2 font-bold text-gray-900  sm:text-md w-full">
                                {data?.name}
                              </h3>
                            </div>
                          </div>
                        </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditClass;
