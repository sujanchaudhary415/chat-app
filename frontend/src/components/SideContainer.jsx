import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { useChatStore } from "./../store/useChatStore"; // Store import

const SideContainer = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore(); 

  useEffect(() => {
    getUsers();
  }, []); // Run once on mount

  return (
    <div className="w-[20%] overflow-y-scroll">
      <div className="flex items-center gap-2 p-5">
        <FaUsers className="text-2xl" />
        <h2>Contacts</h2>
      </div>

      {users?.map((user) => (
        <button
          key={user._id}
          onClick={() => {
            setSelectedUser(user);
            console.log("Selected User:", user);
          }}
          className={`flex gap-3 mt-1 hover:bg-emerald-950 w-full px-2 py-1 rounded 
            ${selectedUser?._id === user._id ? "bg-emerald-900" : "bg-base-100"}`}
        >
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col">
            <p className="text-md">{user.fullName}</p>
            <p className="text-sm text-gray-500 flex">Offline</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SideContainer;
