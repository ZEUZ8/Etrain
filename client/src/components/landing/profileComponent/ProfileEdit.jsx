import React from "react";
import { useFormik } from "formik";
import Loader from "../../../components/landing/loader/Loader";
import { userUpdation } from "../../../validations/students/updateValidation";

const ProfileEdit = ({ setIsOn, teacher, loading, handleUpdation }) => {
  const errorMsgs = ["Access Denied", "jwt malformed", "jwt expired"];

  const handleClick = () => {
    setIsOn(false);
  };

  const onSubmit = async (values) => {
    handleUpdation(values);
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: teacher ? teacher?.name : "",
        email: teacher ? teacher?.email : "",
        phone: teacher ? teacher?.phone : "",
        password: "",
      },
      validationSchema: userUpdation,
      onSubmit,
    });

  return (
    <div>
      <div className="">
        <div class="h-fit  bg-opacity-50 py-6 flex flex-col justify-center sm:py-12">
          <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-violet-300 to-violet-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div class="max-w-md mx-auto">
                <div className="flex   w-screen">
                  <div>
                    <h1 class="text-2xl font-semibold">Edit Profile</h1>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={handleClick}
                      type="button"
                      className="   text-gray-900  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-blue-200 dark:hover:text-white"
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
                <div class="divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <form className="" onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          User Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="User Name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          User Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="userEmail"
                          type="email"
                          placeholder="User Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div className="flex">
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                          >
                            User Phone
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="phone"
                            placeholder="User phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.phone && touched.phone && (
                            <p className="text-red-600">{errors.phone}</p>
                          )}
                        </div>

                        <div className="ml-3 mb-6">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                          >
                            Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="User password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password && (
                            <p className="text-red-600">{errors.password}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        {loading ? (
                          <Loader />
                        ) : (
                          <button
                            className="bg-violet-300 hover:bg-violet-400 w-full mt-3  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Update
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
          {/* <div class="divide-y divide-gray-200">
<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
    <div class="relative">
        <input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
    </div>
    <div class="relative">
        <input autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
    </div>
    <div class="relative">
        <button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
    </div>
</div>
</div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
