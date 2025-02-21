import React from "react";
import { useChatStore } from "./../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser,setSelectedUser } = useChatStore();

  return (
    <div className="flex justify-between  w-full px-6">
      <div className="flex items-center gap-2">
        <img
          src={selectedUser.profilePic || "./avatar.png"}
          alt=""
          className="size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-lg">{selectedUser.fullName}</p>
          <p className="text-xs">Offline</p>
        </div>
      </div>
      <div className="text-2xl font-bold cursor-pointer" onClick={()=>setSelectedUser(null)}>X</div>
    </div>
  );
};

export default ChatHeader;
