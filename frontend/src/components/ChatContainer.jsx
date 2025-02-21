import React from "react";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";


const ChatContainer = () => {

  return (
    <div className="px-5 py-1 w-full">
      <div>
        <ChatHeader />
        <p>Messages</p>
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
