import React from "react";
import Navbar from "../../landing/navbar/Navbar";
import SideBar from "../../landing/sideBar/SideBar";

const TimeTable = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: "url('/img/banner_bg.png')" }}
        className="bg-cover bg-center bg-no-repeat h-screen "
      >
        <SideBar />
        <Navbar />
        <div className="p-4 sm:ml-64">
            <div className="text-3xl underline underline-offset-8 ">Time Table</div>
        </div>
  
        <div class="p-4 sm:ml-64">
          <div class="p-4 border-2 border-gray-100  rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-6 gap-4 mb-4">
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-300">
                <p class="text-2xl text-gray-400 dark:text-gray-500">period Time</p>
              </div>
             
            </div>
            <div class="flex items-center justify-center h-[30rem] mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-white">IMG</p>
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
