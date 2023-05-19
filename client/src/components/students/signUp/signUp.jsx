import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentSchema } from "../../../validations/students/signupValidation";
import { studentsRegister } from "../../../axios/services/studentServices/studentServices.js";
import Loader from "../../landing/loader/Loader";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit() {
    console.log("at the onSubmit functiion in the signup page");
    setLoading(true);
    const response = await studentsRegister(values);
    if (response.msg === "Account Created") {
      // dispatch(
      //   userLogin({
      //     user: response.user,
      //     id: response.id,
      //     email:response.email
      //   })
      // );
      setLoading(false);
      navigate("/otp",{state:{email:response.email,user:response.user,id:response.id}});
    } else {
      console.log("entered in the else codition ");
    }
  }

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
        studentClass: "",
        division: "",
      },
      validationSchema: studentSchema,
      onSubmit,
    });

  const loginPage = async () => {
    navigate("/login");
  };

  return (
    
    <div>
     
      <div
        style={{ backgroundImage: "url('/img/banner_bg.png')" }}
        className="bg-cover bg-center bg-no-repeat h-screen "
      >
        <div class="pt-10  pl-10">
          <div class="flex justify-left items ">
            <a href="/">
              <img src="/img/logo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <div class="bg-left-gradient w-[32rem]  h-[42rem] align-middle rounded-[5rem]">
            {/* <div class="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8"> */}{" "}
            {/* just removed the justify-center */}
            <div class="flex min-h-full flex-col   px-6 py-12 lg:px-8">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-start underline underline-offset-8 text-2xl font-bold leading-9 tracking-tight text-white  ">
                  Sign Up
                </h2>
              </div>

              <div class="mt-10 sm:mx-auto sm:w-full ">
                <form class="space-y-6" method="POST" onSubmit={handleSubmit}>
                  <div className="flex ">
                    <div className="flex-1">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-white"
                      >
                        Name
                      </label>
                      <div class="mt-2">
                        <input
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 pl-3
                           shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-600">{errors.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ">
                      <div class="flex items-center justify-between ml-2">
                        <label
                          for="password"
                          class="block text-sm font-medium leading-6 text-white"
                        >
                          Phone
                        </label>
                      </div>
                      <div class="mt-2 ml-2">
                        <input
                          id="phone"
                          name="phone"
                          type="number"
                          autoComplete="phone"
                          value={values.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 pl-3
                           text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                        {errors.phone && touched.phone && (
                          <p className="text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex ">
                    <div className="flex-1">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-white"
                      >
                        Email
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 pl-3
                          text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                           focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ">
                      <div class="flex items-center justify-between ml-2">
                        <label
                          for="password"
                          class="block text-sm font-medium leading-6 text-white"
                        >
                          Password
                        </label>
                        {/* <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                          </div> */}
                      </div>
                      <div class="mt-2 ml-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="current-password"
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 pl-3
                           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                        {errors.password && touched.password && (
                          <p className="text-red-600">{errors.password}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="flex-1">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-white"
                      >
                        Class
                      </label>
                      <div class="mt-2">
                        <input
                          maxLength={1}
                          id="studentClass"
                          name="studentClass"
                          type="number"
                          value={values.studentClass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="studentClass"
                          class="block w-full rounded-[0.8rem] border-0 py-2.5 text-gray-900 shadow-sm pl-3
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                        {errors.studentClass && touched.studentClass && (
                          <p className="text-red-600">{errors.studentClass}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ">
                      <div className="flex items-center justify-between ml-2">
                        <label
                          for="password"
                          class="block text-sm font-medium leading-6 text-white"
                        >
                          Divisioin
                        </label>
                      </div>
                      <div class="mt-2 ml-2">
                        <input
                        maxLength={1}
                          id="division"
                          name="division"
                          type="text"
                          value={values.division}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="division"
                          class="block w-full rounded-[0.8rem] pl-3
                           border-0 py-2.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                        {errors.division && touched.division && (
                          <p className="text-red-600">{errors.division}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-center">
                  {loading ? <Loader /> :      <button
                      type="submit"
                      className="flex w-3/5 justify-center rounded-[6rem] bg-white px-3 py-1.5 text-sm font-semibold leading-6
                       text-[#ef4444] shadow-lg hover:bg-indigo-500 focus-visible:outline 
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3
                        " disabled={loading}>
                      Sign Up
                    </button> }
              
                  </div>
                </form>

                <p class=" text-center mt-7 text-sm text-gray-500">
                  Have an Account?
                  <a
                    href="#"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    onClick={loginPage}
                  >
                    Click here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
