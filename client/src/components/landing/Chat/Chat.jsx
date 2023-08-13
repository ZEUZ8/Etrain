import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BsFillSendFill } from "react-icons/bs";

import {
  CreateTeacherMessages,
  GetTeacherConversation,
  GetTeacherMessages,
  GetTeacher,
} from "../../../axios/services/TeacherSrevices/teacherServices";
import {
  GetPrincipalConversation,
  GetPrincipalMessages,
  GetPrincipal,
  CreatePrincipalMessages,
} from "../../../axios/services/principalServices/principlaServices";
import {
  CreateStudentMessages,
  GetStudentConversation,
  GetStudentMessages,
  GetStudent,
} from "../../../axios/services/studentServices/studentServices";
import Conversation from "./Conversation";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const Chat = ({ user }) => {
  const pricnipalData = useSelector((state) => state.principalReducer);
  const principalToken = pricnipalData?.token;
  const principalId = pricnipalData?.id;

  const teacherData = useSelector((state) => state.teacherReducer);
  const teacherToken = teacherData?.token;
  const teacherId = teacherData?.id;

  const studentData = useSelector((state) => state.studentReducer);
  const studentToken = studentData?.token;
  const studentId = studentData?.id;

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [member, setMember] = useState("");
  const [loading, setLoading] = useState(false);

  const errMsgs = ["jwt expired", "Acces Denied", "jwt malformed"];

  const scrollRef = useRef();
  const socket = useRef();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setCurrentUser(
      user === "student"
        ? studentData
        : user === "teacher"
        ? teacherData
        : pricnipalData
    );
    const fetchData = async () => {
      try {
        setLoading(true);
        if (user === "student") {
          const response = await GetStudent(studentToken, studentId);
          if (errMsgs.some((msg) => msg === response.msg || response.message)) {
            navigate("/login");
          } else if (response.msg === "succesfull") {
            setMember(response.student);
          }
        } else if (user === "teacher") {
          const response = await GetTeacher(teacherToken, teacherId);
          if (errMsgs.some((msg) => msg === response.msg || response.message)) {
            navigate("/login");
          } else if (response.msg === "succesfull") {
            setMember(response.teacher);
          }
        } else if (user === "principal") {
          const response = await GetPrincipal(principalToken, principalId);
          if (errMsgs.some((msg) => msg === response.msg || response.message)) {
            navigate("/login");
          } else if (response.msg === "succesfull") {
            setMember(response.principal);
          }
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // socket.current = io("https://etrain-z30o.onrender.com");

  socket.current = io("https://etrain-z30o.onrender.com");
  // socket.current = io("http://localhost:4000");

  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {});
  }, [currentUser]);


  useEffect(() => {
    socket.current.on("getMessage", (res) => {
      if (res.receiverId === currentUser.id) {
        setArrivalMessage({
          sender: res.senderId,
          text: res.text,
          createdAt: Date.now(),
        });
      }
    });
  });

  useEffect(() => {
    const GetConversations = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    GetConversations();
  }, [user]);


  console.log(conversations,' the converstaion in the result')

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
        console.log(response,'the principal chat')
      }
      setMessages(response);
    };
    getmsgs();
  }, [currentChat]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser?.id,
      text: newMessages,
      conversationId: currentChat?._id,
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
    console.log(currentChat?.id, "the ida");
    try {
      if (user === "student") {
        var response = await CreateStudentMessages(studentToken, message);
      } else if (user === "teacher") {
        var response = await CreateTeacherMessages(teacherToken, message);
      } else {
        var response = await CreatePrincipalMessages(principalToken,message)
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
              src={member?.profile ? member?.profile : `/img/user.png`}
              alt="Profile"
            ></img>

            <div className="px-3">{member?.name}</div>
          </div>

          <div class="flex flex-row justify-between bg-white">
            <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div class="border-b-2 py-4 px-2">
                {/* <input
                  type="text"
                  placeholder="search chatting"
                  class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                /> */}
              </div>
              {conversations?.map((c) => (
                <div key={c?._id} onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={currentUser}
                    loading={loading}
                    currentChat={currentChat}
                  />
                </div>
              ))}
            </div>

            <div
              class={`w-full px-5 flex flex-col justify-between ${
                currentChat && "overflow-y-auto h-[39rem]"
              }`}
            >
              {currentChat ? (
                <>
                  <div class="flex flex-col mt-5">
                    {messages?.map((m) => {
                      return (
                        <React.Fragment key={m?._id}>
                          <Message
                            message={m}
                            owned={m?.sender === currentUser?.id}
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
                      required
                      ref={scrollRef}
                      value={newMessages}
                      onChange={(e) => setNewMessages(e.target.value)}
                    />
                    <button
                      className="m-2 rounded-lg"
                      onClick={handleSubmit}
                      disabled={!newMessages}
                    >
                      <BsFillSendFill className="w-8 h-8 text-red-400" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center align-middle ">
                  <img
                    src="/img/chat.jpg"
                    className="h-fit w-fit"
                    alt="userpng"
                  />
                </div>
              )}
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
