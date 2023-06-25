import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  CreateTeacherMessages,
  GetTeacherConversation,
  GetTeacherMessages,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import {
  GetPrincipalConversation,
  GetPrincipalMessages,
} from "../../../axios/services/principalServices/principlaServices";
import {
  CreateStudentMessages,
  GetStudentConversation,
  GetStudentMessages,
} from "../../../axios/services/studentServices/studentServices";
import Conversation from "./Conversation";
import Message from "./Message";

const Chat = ({ user }) => {
  const pricnipalData = useSelector(
    (state) => state.principalReducer.principal
  );
  const principalToken = pricnipalData?.token;
  const principalId = pricnipalData?.id;

  const teacherData = useSelector((state) => state.teacherReducer.teacher);
  const teacherToken = teacherData?.token;
  const teacherId = teacherData?.id;

  const studentData = useSelector((state) => state.studentReducer.student);
  const studentToken = studentData?.token;
  const studentId = studentData?.id;

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  const currentUser =
    user === "student"
      ? studentData
      : user === "teacher"
      ? teacherData
      : pricnipalData;

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  socket.current = io("http://localhost:4000");

  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      // console.log(users,'the users')
    });
    console.log(currentUser,currentUser.id,' all the users in the console')
  }, [currentUser]);

  useEffect(() => {
    socket.current.on("getMessage", (res) => {
      if(res.receiverId === currentUser.id){
        setArrivalMessage({
          sender: res.senderId,
        text: res.text,
        createdAt: Date.now(),
      });
    }
    });
    console.log(arrivalMessage, "the messages");
  });

  useEffect(() => {
    const GetConversations = async () => {
      try {
        if (user === "student") {
          var response = await GetStudentConversation(studentToken, studentId);
        } else if (user === "teacher") {
          var response = await GetTeacherConversation(teacherToken, teacherId);
        } else if (user === "principal") {
          var response = await GetPrincipalConversation(
            principalToken,
            principalId
          );
        }
        setConversations(response);
      } catch (error) {
        console.log(error);
      }
    };
    GetConversations();
  }, [user]);

  useEffect(() => {
    const getmsgs = async () => {
      if (user === "student") {
        var response = await GetStudentMessages(studentToken, currentChat?._id);
      } else if (user === "teacher") {
        var response = await GetTeacherMessages(teacherToken, currentChat?._id);
      } else if (user === "principal") {
        var response = await GetPrincipalMessages(
          principalToken,
          currentChat?._id
        );
      }
      setMessages(response);
    };
    getmsgs();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: currentUser.id,
      text: newMessages,
      conversationId: currentChat._id,
    };
    // console.log(currentChat.members,"the user")

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser?.id,
      receiverId,
      text: newMessages,
    });
    try {
      if (user === "student") {
        var response = await CreateStudentMessages(studentToken, message);
      } else if (user === "teacher") {
        var response = await CreateTeacherMessages(teacherToken, message);
      } else {
        console.log("principal is the user");
      }
      setMessages([...messages, response]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className="md:ml-64">
        <div class="container mx-auto shadow-lg rounded-lg">
          <div
            class={`px-5 py-5 shadow-2xl flex items-center rounded-2xl border-b-2 bg-red-200`}
          >
            {/* <div class="font-semibold text-2xl">GoingChat</div>
            <div class="w-1/2">
              <input
                type="text"
                name=""
                id=""
                placeholder="search IRL"
                class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
              />
            </div> */}
            <img
              class="w-10 h-10 shadow-2xl rounded-full"
              src="img/girl.jpg"
              alt="Rounded avatar"
            ></img>
            <div className="px-3"></div>
          </div>
          <div class="flex flex-row justify-between bg-white">
            <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div class="border-b-2 py-4 px-2">
                <input
                  type="text"
                  placeholder="search chatting"
                  class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              {conversations?.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={currentUser} />
                </div>
              ))}
            </div>

            <div class="w-full px-5 flex flex-col justify-between overflow-y-auto h-[39rem]">
              <div class="flex flex-col mt-5">
                {messages?.map((m) => {
                  return (
                    <React.Fragment key={m._id}>
                      <Message
                        message={m}
                        owned={m.sender === currentUser.id}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              <div class="py-5 flex">
                <input
                  class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                  ref={scrollRef}
                  value={newMessages}
                  onChange={(e) => setNewMessages(e.target.value)}
                />
                <button
                  className="m-2 bg-red-300 rounded-lg"
                  onClick={handleSubmit}
                >
                  send
                </button>
              </div>
            </div>
            {/* <div class="w-2/5 border-l-2 px-5">
              <div class="flex flex-col">
                <div class="font-semibold text-xl py-4">Mern Stack Group</div>
                <img
                  src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                  class="object-cover rounded-xl h-64"
                  alt=""
                />
                <div class="font-semibold py-4">Created 22 Sep 2021</div>
                <div class="font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt, perspiciatis!
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
