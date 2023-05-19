import React from 'react'
import { FaBeer } from 'react-icons/fa';

const ProfileComponent = () => {
  return (
    <div>
         <div class="p-4 sm:ml-64 flex justify-center">
            <div class="flex items-center justify-between h-[6rem] w-[60rem] mb-4 rounded-[1rem] bg-gray-50 dark:bg-[#FF663B]">
                <div class="flex flex-wrap justify-start">
                  <div class="w-6/12 sm:w-4/12 px-4">
                    <img src="img/girl.jpg" alt="..." class="shadow rounded-full h-[4.5rem] w-[15rem] align-middle border-none" />
                  </div>
                  <p className=' flex items-center text-white'>name</p>
              </div>
              
              <div className='mr-10'>
                {/* <p class="text-1xl text-gray-400 dark:text-white">Edit </p> */}
                <p class="text-1xl text-gray-400 dark:text-white underline underline-offset-4">EDIT</p>
              </div>
            </div>
         </div>
    </div>
  )
}

export default ProfileComponent
