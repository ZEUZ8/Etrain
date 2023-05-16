import axios from "axios";

export const axiosStudentInstance = axios.create({baseURL :"http://localhost:4000/" })
export const axiosTeacherInstance = axios.create({baseURL :"http://localhost:4000/teacher" })
export const axiosPrincipalInstance = axios.create({baseURL :"http://localhost:4000/principal" })


export const teacherAPI = "http://localhost:4000/teacher/";