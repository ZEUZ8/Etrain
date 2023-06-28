import React, { useState, useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  GetTeacher,
  UpdateTeacher,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import { GetStudent,UpdateStudent } from "../../../axios/services/studentServices/studentServices";
import { GetPrincipal,UpdatePrincipal } from "../../../axios/services/principalServices/principlaServices";
import ProfileEdit from "./ProfileEdit";
import ProfileEditPrincipal from "./ProfileEidtPrincipal";
import ProfileEditStudent from "./ProfileEditStudent";

const ProfileComponent = ({ user }) => {
  const teacherData = useSelector((state) => state.teacherReducer);
  const teacherToken = teacherData?.token;
  const teacherId = teacherData?.id;

  const studentData = useSelector((state) => state.studentReducer);
  const studentToken = studentData?.token;
  const studentId = studentData?.id;

  const principalData = useSelector(
    (state) => state.principalReducer
  );
  const principalToken = principalData?.token;
  const principalId = principalToken?.id;

  const navigate = useNavigate();
  const [principal, setPrincipal] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [loading, setLoaind] = useState("");
  const errorMsgs = ["Access Denied", "jwt malformed", "jwt expired"];

  useEffect(() => {
    const fetchData = async () => {
      if (user === "teacher") {
        const response = await GetTeacher(teacherToken, teacherId);
        if (errorMsgs.some((msg) => msg === response.msg || response.message)) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setTeacher(response.teacher);
        }
      } else if (user === "student") {
        const response = await GetStudent(studentToken, studentId);
        if (errorMsgs.some((msg) => msg === response.msg || response.message)) {
          navigate("/login");
        } else if (response.msg === "succesfull") {
          setStudent(response.student);
        }
      } else if (user === "principal") {
        const response = await GetPrincipal(principalToken, principalId);
        if (errorMsgs.some((msg) => msg === response.msg || response.message)) {
          console.log(true);
          navigate("/principal/login");
        } else if (response.msg === "succesfull") {
          setPrincipal(response.principal);
        }
      }
    };
    fetchData();
  }, [user]);
  const handleProfileEdit = async () => {
    if (teacher || principal || student) {
      setIsOn(true);
    } else {
      toast.error("User Not Found");
    }
  };

  const handleUpdation = async (value) => {
    try {
      if (user === "teacher") {
        const response = await UpdateTeacher(teacherToken,teacherId,value);
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/teacher/login");
        } else if (response.msg === "succesfull") {
          setTeacher(response.teacher);
          toast.success(response.msg)
          setIsOn(false)
        }
      }else if(user === "student"){
        const response = await UpdateStudent(studentToken,studentId,value)
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/login");
        } else if (response.msg === "succesfull") {
          setStudent(response.student);
          toast.success(response.msg)
          setIsOn(false)
        }
      }else if(user === "principal"){
        const response = await UpdatePrincipal(principalToken,principalId,value)
        if (errorMsgs.some((msg) => msg === response.msg)) {
          navigate("/principal/login");
        } else if (response.msg === "succesfull") {
          setPrincipal(response.principal);
          toast.success(response.msg)
          setIsOn(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div class="p-4 sm:ml-64 flex justify-center">
        {user === "student" ? (
          <div>
            {" "}
            {isOn && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-baseline justify-center bg-gray-900 bg-opacity-50 z-50">
                <ProfileEditStudent
                  setIsOn={setIsOn}
                  loading={loading}
                  student={student}
                  handleUpdation={handleUpdation}
                />
              </div>
            )}
          </div>
        ) : user === "principal" ? (
          <div>
            {" "}
            {isOn && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-baseline justify-center bg-gray-900 bg-opacity-50 z-50">
                <ProfileEditPrincipal
                  setIsOn={setIsOn}
                  loading={loading}
                  principal={principal}
                  handleUpdation={handleUpdation}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {" "}
            {isOn && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-baseline justify-center bg-gray-900 bg-opacity-50 z-50">
                <ProfileEdit
                  setIsOn={setIsOn}
                  loading={loading}
                  teacher={teacher}
                  handleUpdation={handleUpdation}
                />
              </div>
            )}{" "}
          </div>
        )}
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
                alt="profile"
                class="shadow rounded-full h-[4.5rem] w-[15rem] align-middle border-none"
              />
            </div>
            <p className=" flex items-center text-white">
              {user === "teacher"
                ? teacher.name
                : user === "student"
                ? student.name
                : principal.name}
            </p>
          </div>

          <div className="mr-10 flex justify-between w-max">
            <div className=" flex">
              <div className="mx-5 text-white sm:text-md md:text-2xl">
                {user === "teacher"
                  ? `${teacher?.class}${teacher?.division}`
                  : user === "student"
                  ? `${student?.studentClass}${student?.division}`??"kk"
                  : ""}
              </div>
            </div>
            <div>
              <p
                class="text-1xl text-gray-400 dark:text-white underline underline-offset-4 hover:cursor-pointer sm:text-xs"
                onClick={handleProfileEdit}
              >
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
