import React from "react";
import {format} from 'timeago.js'

const Message = ({ message, owned }) => {
  return (
    <>
      <div
        class={`flex items-center ${
          owned ? `justify-end` : `justify-start`
        } mb-4`}
      >
        <img
          src="/img/girl.jpg"
          class="object-cover h-8 w-8 rounded-full"
          alt="profile"
        />
        <div>
          <div
            className={
              owned
                ? `ml-2 py-3 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`
                : `ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`
            }
          >
            {message?.text}
          </div>
          <span className="text-xs tex-center text-gray-500 leading-none ">
            <p className={`${owned ? `text-start ml-2 p-1` :  `text-end mr-2 p-1`}`}>{format(message.createdAt)}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Message;
