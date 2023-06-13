import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const PrincipalTeacherEdit = ({ setIson, data, oldData, handleUpdation}) => {


  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");  

  const formData = new FormData();
  formData.append("class", selectedClass);
  formData.append("division", selectedDivision);

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = {
      className:selectedClass,
      division:selectedDivision,
      teacherId:null
    }
    handleUpdation(formData)
  };

  const handleClick = () => {
    setIson(false);
  };

  return (
    <div className="flex">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-200">
            <button
              onClick={handleClick}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text">
                Edit Teacher
              </h3>
              <form className="space-y-6"  onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="flex-1">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Select an Class
                    </label>
                    <select
                      name="class"
                      id="countries"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="Not Assigned" selected>
                        Not Assigned
                      </option>
                      {data.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* 
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Class
                    </label>
                    <input
                      type="text"
                      name="class"
                      id="class"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select A Class"
                    /> */}
                  </div>

                  <div className="flex-1 ml-3">
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Select an Division
                    </label>
                    <select
                      name="division"
                      id="division"
                      value={selectedDivision}
                      required
                      onChange={(e) => setSelectedDivision(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Not Assigned</option>
                      {oldData.map((item) => (
                        <option>{item.division}</option>
                      ))}
                    </select>

                    {/* <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Division
                    </label>
                    <input
                      type="text"
                      name="division"
                      id="division"
                      placeholder="Select A Division"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    /> */}
                  </div>
                </div>
                <div class="flex justify-between">
                  {/* <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        name="isChecked"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      for="remember"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text"
                    >
                      Approve
                    </label>
                  </div> */}
                  {/* <a
                    href="#"
                    class="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a> */}
                </div>
                <button
                 
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-left-gradient dark:hover:bg-red-500 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                {/* <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="#"
                    class="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalTeacherEdit;
