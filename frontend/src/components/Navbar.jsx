import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuthStore } from "./../store/useAuthStore";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authUser,logout } = useAuthStore();
  return (
    <div className="w-full flex items-center justify-between text-[#CBAD8D] font-bold text-md">
      <Link to="/" className="flex items-center gap-2">
        <FiMessageSquare className="text-2xl " />
        <h1 className="font-semibold ">Chatty</h1>
      </Link>

      <div className="flex items-center justify-between gap-3">
        <Link to="/setting" className="flex items-center gap-2">
          <IoMdSettings className="text-xl" />
          <h1 className="font-semibold hidden sm:block">Settings</h1>
        </Link>

        {authUser && (
          <>
            <div className="flex items-center gap-2">
              <FaRegUser className="text-xl" />
              <Link to="/profile" className="font-semibold hidden  sm:block">Profile</Link>
            </div>

            <div  className="flex items-center gap-2">
              <CiLogout onClick={logout}  className="text-xl" />
              <h1  className="font-semibold hidden sm:block">Logout</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
