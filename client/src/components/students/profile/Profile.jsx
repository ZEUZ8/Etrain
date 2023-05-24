import React from "react";

const Profile = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: "url('/img/banner_bg.png')" }}
        className="bg-cover bg-center bg-no-repeat h-screen "
      >

        <div class="p-4 sm:ml-64">
          <div class="p-4  border-gray-200 rounded-lg dark:border-gray-700">
            {/* <div class="grid grid-cols-3 gap-4 mb-4">
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div> */}
            {/* <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div> */}
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="flex items-center justify-center rounded-[1rem]  bg-gray-50 h-[30rem] dark:bg-sky-100">
                <p class="text-2xl text-gray-400 dark:text-gray-500">GRAPH</p>
              </div>
              <div class=" w-[full] rounded-[1rem] bg-gray-50 h-[30rem] dark:bg-sky-100">
                <div className="grid grid-cols-4 gap-1 p-10">
                    <div className=" flex justify-center w-full rounded-[1rem] bg-green-400">Present</div>
                    <div className=" flex justify-center w-full rounded-[1rem] bg-red-500">Absent</div>
                    <div className=" flex justify-center w-full rounded-[1rem] bg-violet-400">Hollidy</div>
                    <div className=" flex justify-center w-full rounded-[1rem] bg-pink-400">Informed</div>
                </div>
                  <p className="pl-3 underline underline-offset-4">June</p>
                <div className="m-3 w-full">
                  <div className="bg-violet-300 w-[20rem] grid grid-rows-5 h">
                    <div className="bg-red-500 grid grid-cols-6">
                      sian
                    </div>
                  </div>
                </div>
                {/* <p class="text-2xl text-gray-400 dark:text-gray-500">+</p> */}
              </div>
              {/* <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div> */}
                
            </div>

            {/* <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div> */}
            {/* <div class="grid grid-cols-2 gap-4">
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

export default Profile;
