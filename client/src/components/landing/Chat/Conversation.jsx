import React, { useEffect, useState } from "react";
import {AiOutlineMessage} from "react-icons/ai"
import { io } from "socket.io-client";
import {
  GetStudent,
  StudentChatMember,
} from "../../../axios/services/studentServices/studentServices";
import {
  GetTeacher,
  TeacherChatMember,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import {
  GetPrincipal,
  principalChatMember,
} from "../../../axios/services/principalServices/principlaServices";
import Loader2 from "../Loader2/Loader2";

const Conversation = ({ conversation, currentUser, loading,currentChat }) => {
  const [user, setUser] = useState(null);
  const [notify,setNotify] = useState(true);
  const [msg,setMsg] = useState('')

  socket.current = io("https://etrain-z30o.onrender.com");
  // const socket = io("http://localhost:4000");

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser.id);

    const GetUser = async () => {
      try {
        if (currentUser.user === "student") {
          var response = await StudentChatMember(currentUser?.token, friendId);
        } else if (currentUser.user === "teacher") {
          var response = await TeacherChatMember(currentUser?.token, friendId);
          console.log(response,'teh repsonse')
        } else if (currentUser.user === "principal") {
          var response = await principalChatMember(
            currentUser?.token,
            friendId
          );
        }
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };
    GetUser();
  }, []);

  useEffect(()=>{
    socket.on("getNotify",(res)=>{
      setMsg(res?.text)
      if(currentUser?.id === res?.receiverId){
        setNotify(res.read)
      }
    })
  },[msg])

  useEffect(()=>{
    setNotify(true)
  },[currentChat?._id])

  return (
    <>
      {!loading ? (
        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <div class="w-1/4">
            <img
              src={user?.profile ? user?.profile : `/img/user.png`}
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full flex justify-between items-center">
            <div class="text-lg font-semibold">{user?.name}</div>
            {/* <span class="text-gray-500">Pick me at 9:00 Am</span> */}
            <span>
                   {!notify && <AiOutlineMessage className="text-green-600"/>}
                  </span>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full">
            <Loader2 />
          </div>
        </>
      )}
    </>
  );
};

export default Conversation;
