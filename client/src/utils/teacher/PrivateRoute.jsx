import React from "react"
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const teacherData = useSelector(state => state.teacherReducer);
  const token = teacherData?.token;
  
  React.useEffect(() => {
    if (!token) {
      navigate("/teacher/login");
    }
  }, [navigate, token]);

  console.log('I have been');

  return token ? <Outlet /> : null;
};

export default PrivateRoute;