import React from "react";
import { FiMessageSquare } from "react-icons/fi";
const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center ">
        <FiMessageSquare className="text-4xl animate-bounce " />
        <h1 className="text-2xl font-bold">Welcome To Chatty</h1>
        <p className="text-gray-500">Select a conversation from a sidebar to start chatting</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
