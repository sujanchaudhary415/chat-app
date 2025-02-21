import React from "react";
import SideContainer from "./../components/SideContainer";
import ChatContainer from "./../components/ChatContainer";
import NoChatSelected from './../components/NoChatSelected';
import { useChatStore } from './../store/useChatStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="container mx-auto flex  mt-20   bg-[#23272e] w-full h-[80%] rounded">
      <SideContainer />
      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  );
};

export default HomePage;
