import React, { useState, useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileComponent = ({ user }) => {
  const teacherData = useSelector((state) => state.teacherReducer.teacher);
  const teacherToken = teacherData?.token;

  const studentData = useSelector((state) => state.studentReducer.student);
  const studenttoken = studentData?.token;

  const principalData = useSelector(
    (state) => state.principalReducer.principal
  );
  const principalToken = principalData?.token;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <div class="p-4 sm:ml-64 flex justify-center">
        <div
          class={`flex items-center justify-between h-[6rem] w-[60rem] mb-4 rounded-[1rem] ${
            user === "teacher"
              ? `bg-violet-400`
              : user === "principal"
              ? `bg-fuchsia-400`
              : `bg-left-gradient`
          } `}
        >
          <div class="flex flex-wrap justify-start">
            <div class="w-6/12 sm:w-4/12 px-4">
              <img
                src="img/girl.jpg"
                alt="..."
                class="shadow rounded-full h-[4.5rem] w-[15rem] align-middle border-none"
              />
            </div>
            <p className=" flex items-center text-white">name</p>
          </div>

          <div className="mr-10 flex justify-between">
            <div className=" flex">
              <div className="">name</div>
              <div className="mx-5">class</div>
            </div>
            <div>
              <p class="text-1xl text-gray-400 dark:text-white underline underline-offset-4">
                EDIT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
