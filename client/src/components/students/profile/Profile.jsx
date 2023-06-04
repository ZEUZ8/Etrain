import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import {GetAttandence} from "../../../axios/services/studentServices/studentServices"
import Loader from "../../landing/loader/Loader"


const Profile = () => {

  const studentData = useSelector(state => state.studentReducer.student)
  const token = studentData?.token

  const [currentMonth, setCurrentMonth] = useState('');
  const [studentPresents,setStudentPresents] = useState([])
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage] = useState(0)
  const taskPerPage = 30;

  useEffect(() => {
    setLoading(true)
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
    const fetchData = async()=>{
      try{
        const response = await GetAttandence(token)
        if(response.msg === "succesfull"){
          if(response.presents.attendance){
            setStudentPresents(response.presents.attendance)
          }else{
            toast.error("Don't have marked attendance")
          }
        }else{
          toast.error(response.msg)
        }
      }catch(error){
        toast.error(error.msg)
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, []);
  const taskToDisplay = studentPresents.slice(
    currentPage * taskPerPage,
    (currentPage + 1 ) * taskPerPage
  )


  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };


  return (
    <div>
      <div
      >
        < ToastContainer />
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
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center justify-center rounded-[1rem]  bg-gray-50 h-[30rem] dark:bg-sky-100">
                <p class="text-2xl text-gray-400 dark:text-gray-500">GRAPH</p>
              </div>
              <div class=" w-full rounded-2xl bg-gray-50 h-[30rem] dark:bg-sky-100">
                
                <div class="m-5">
                  <p className="pl-3 underline underline-offset-4">{currentMonth}</p>
                </div>
                <div className="flex gap-10 m-5  justify-center">
                    <div className="  rounded-[1rem] bg-green-400 px-4 py-2">Present</div>
                    <div className="  rounded-[1rem] bg-red-500 px-4 py-2">Absent</div>
                    <div className="  rounded-[1rem] bg-violet-500 px-4 py-2">Holliday</div>
                </div>
                  
                <div className="m-3">
                        {loading && <  Loader />}
                  <div class='flex justify-center'>
                    <div className="rounded-xl bg-white shadow-2xl w-full h-full mx-5">
                      <div className="grid grid-cols-7 gap-5 m-2">
                        {taskToDisplay.map(present=>{
                           const date = new Date(present?.day);
                           const presentDay = date.getUTCDate();
                          return(
                            <div key={present._id} className={`${present.status === "present" ? `bg-green-400` : `bg-red-500`} border-gray-200 shadow-2xl rounded-lg w-10 h-10 items-center m-2 flex justify-center`}>{presentDay}</div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <p class="text-2xl text-gray-400 dark:text-gray-500">+</p> */}
                <div className="flex justify-center items-end mt-5 flex-column" style={{ height: '200px' }}>
                <ReactPaginate 
                    containerClassName="flex justify-center  items-center mt-5"
                    pageLinkClassName="bg-left-gradient  hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full mx-1"
                    previousLinkClassName="  text-white font-bold py-3 px-1 "
                    nextLinkClassName="  text-white font-bold py-3 px-1 "
                    previousLabel={<GrFormPrevious name="arrow-left" />}
                    nextLabel={< GrFormNext name="arrow-right" />}
                    breakLabel={'...'}
                    pageCount={Math.ceil(studentPresents.length / taskPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    // containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                </div>
                
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
