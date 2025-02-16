import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuthStore } from "./../store/useAuthStore";
const Navbar = () => {
  const { authUser,logout } = useAuthStore();
  return (
    <div className="w-full flex items-center justify-between text-[#CBAD8D] font-bold text-md">
      <div className="flex items-center gap-2">
        <FiMessageSquare className="text-2xl " />
        <h1 className="font-semibold ">Chatty</h1>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <IoMdSettings className="text-xl" />
          <h1 className="font-semibold ">Settings</h1>
        </div>

        {authUser && (
          <>
            <div className="flex items-center gap-2">
              <FaRegUser className="text-xl" />
              <h1 className="font-semibold ">Profile</h1>
            </div>

            <div className="flex items-center gap-2">
              <CiLogout onClick={logout} className="text-xl" />
              <h1 className="font-semibold ">Logout</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
