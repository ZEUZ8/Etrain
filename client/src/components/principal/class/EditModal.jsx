import React, { useState ,useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";

import Loader from "../../landing/loader/Loader";

import { classCreationSchema } from "../../../validations/principal/classCreationSchema";
import { UpdateClass,classes } from "../../../axios/services/principalServices/principlaServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditModal = ({
  setUpdate,
  loading,
  currentClass
}) => {

  const principalData = useSelector(state => state.principalReducer)
  const token = principalData?.token

  let errorMsgs = ["Access Denied", "jwt malformed", "jwt expired"];
  const navigate = useNavigate()

  const [editClass,setEditClass] = useState([])

  const handleClick = () => {
    setUpdate(false);
  };


  useEffect(()=>{
    const fetchData =  async ()=>{
      try{
        const respons = await classes(token)
        if(respons == "Access Denied" || respons.message === "jwt malformed"){
          navigate("/principal/login")
        }else {
          respons?.classes.filter(state=>{
            if(state?._id === currentClass?._id){
              setEditClass(state)
            }
          })
          // setEditClass(respons.classes)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])

  const onSubmit = async (values) => {
    const response = await UpdateClass(token,values,currentClass._id)
    if(errorMsgs.some(msg => msg===response?.msg || msg === response?.messages)){
      navigate("/principal/login")
    }else if(response && response._id){

      setUpdate(false)
    }else if(response?.msg){
      toast.error(response?.error)
    }
  };


  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        className: editClass?.className ? editClass?.className : "",
        division: editClass?.division ? editClass?.division : "",
        maxStudents: editClass?.maxStudents ? editClass?.maxStudents : "",
      },
      validationSchema: classCreationSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="flex justify-center flex-col md:flex-row">
        <div className="flex w-max bg-red-100 m-2 items-center justify-center  rounded-3xl shadow-2xl">
          <div className="h-full w-max m-10">
            <div className="flex  justify-between items-center mt-5">
              <div>
                <p className="text-center text-xl  m-3 dark:text underline underline-offset-4">
                  Make Complaint
                </p>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  type="button"
                  className="   text-gray-900  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-500 dark:hover:text-white"
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
              </div>
            </div>
            <div className="w-full pt-10">
              <form
                className="bg-white shadow-md  px-8 pt-6 pb-10  rounded-xl"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Class
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="class"
                    type="number"
                    placeholder={editClass ? editClass?.className : `Class Name`}
                    name="className"
                    value={values.className}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.className && touched.className && (
                    <p className="text-red-600">{errors.className}</p>
                  )}
                </div>

          
                <div className="flex">
                    <div className="mb-5 flex-1">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startDate"
                      >
                        Division
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="division"
                        type="text"
                        placeholder={editClass?.division ? editClass?.division : "Class Division"}
                        name="division"
                        value={values.division}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.division && touched.division && (
                            <p className="text-red-600">{errors.division}</p>
                        )}
                    </div>

                    <div className="mb-5 flex-1 ml-3">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="endDate"
                      >
                        Max Students
                      </label>

                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="maxStudents"
                        type="number"
                        placeholder={editClass?.maxStudents ? editClass?.maxStudents : "max Studetns"}
                        name="maxStudents"
                        value={values.maxStudents}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.maxStudents && touched.maxStudents && (
                            <p className="text-red-600">{errors.maxStudents}</p>
                        )}
                    </div>
                  </div>
{/* 
                  <div>
                  <textarea
                    rows="4"
                    cols="50"
                    className="border rounded-l p-2 shadow text-gray-700"
                    placeholder="Complaint"
                    id="CommonCompaint"
                    type="text"
                    name="complaint"
                    value={values.complaint}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.complaint && touched.complaint &&(
                    <p className="text-red-600">{errors.complaint}</p>
                  )}
                </div> */}


                <div className="flex items-center justify-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      className="bg-fuchsia-200 hover:bg-fuchsia-300 w-full mt-3  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update Class
                    </button>
                  )}
                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
