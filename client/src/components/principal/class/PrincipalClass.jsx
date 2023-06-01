import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../../../components/landing/loader/Loader"
import { classCreationSchema } from "../../../validations/principal/classCreationSchema";
import { classCreation,classes } from '../../../axios/services/principalServices/principlaServices';


const PrincipalClass = () => {

  const principalData = useSelector(state => state.principalReducer.principal)
  const token = principalData?.token

  const [loading,setLoading] = useState(false)
  const [data,setData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    let isCancelled = false;
    setLoading(true)
    const fetchData =  async ()=>{
      try{
        const respons = await classes(token)
        if(respons == "Access Denied" || respons.message === "jwt malformed"){
          navigate("/principal/login")
        }else {
          console.log(respons.classes)
          setData(respons.classes)
        }
      }catch(error){
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  },[])

  async function onSubmit() {
    setLoading(true)
    const response = await classCreation(token,values)
    console.log(response)
    if(response.msg === "created"){
      toast.success("New Class Created")
      setData([...data,response.respons])
    }else if("class Already Added"){
      toast.error(response.msg)
    }else{
      console.log(response,"kiarn")
    }
    setLoading(false)
  }

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        className: "",
        division: "",
        classTeacher: "",
        maxStudents: "",
      },
      validationSchema: classCreationSchema,
      onSubmit,
    });

  return (
    <>
   
      <div className="p-4 sm:ml-64 h-full align-middle">
        <p className="underline underline-offset-4 mb-5">Classes</p>
        <section className="bg-fuchsia-100 rounded-3xl bottom-10">
  
          <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
         {loading&& <Loader/>}
            <div class="grid  gap-4 sm:grid-cols-3">
             {data.map((item)=>( 
             <div
                key={item._id}
                class="block rounded-xl border border-gray-500 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              >
                <span class="inline-block rounded-lg bg-gray-50 p-3">
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

                <h2 class="mt-2 font-bold">Class: {item.className+" "+item.division}</h2>

                <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Class Teacher :  {item.classTeacher?item.classTeacher:"Not Assigned"}
                </p>
              </div>
              ))}
             
            </div>
          </div>
        </section>

        <ToastContainer />
        <div className="flex  h-full mt-10">
          <div className="w-full h-full ">
            <p className="underline underline-offset-4">Create Class</p>
            <div className="flex justify-center ">
              <div className="flex justify-center items-center align-middle w-[50rem] bg-fuchsia-100 0 mt-5 rounded-2xl">
                <form class="w-full max-w-sm m-5" onSubmit={handleSubmit}>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Class Name
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-white rounded-lg appearance-none border-2 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mt-4"
                        id="inline-full-name"
                        type="text"
                        name="className"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.className}
                      />
                         {errors.className && touched.className && (
                          <p className='text-red-600'>{errors.className}</p>
                        )}
                    </div>
                  </div>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        // for="inline-full-name"
                      >
                        Class Division
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        // id="inline-full-name"
                        type="text"
                        name="division"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.division}
                      />
                         {errors.division && touched.division && (
                          <p className='text-red-600'>{errors.division}</p>
                        )}
                    </div>
                  </div>

                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Max Students
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        name="maxStudents"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.maxStudents}
                      />
                       {errors.maxStudents && touched.maxStudents && (
                          <p className='text-red-600'>{errors.maxStudents}</p>
                        )}
                    </div>
                  </div>

                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="inline-full-name"
                      >
                        Teacher
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="classTeacher"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.classTeacher}
                      />
                       {errors.classTeacher && touched.classTeacher && (
                          <p className='text-red-600'>{errors.classTeacher}</p>
                        )}
                    </div>
                  </div>

                  <div class="md:flex md:items-center mt-10">
                    <div class="md:w-1/3"></div>
                    <div class="md:w-2/3">
                    {loading?<Loader/>:
                        <button
                          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                        
                          Create
                        </button>
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrincipalClass;
