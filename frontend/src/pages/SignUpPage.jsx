import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from './../store/useAuthStore.js';
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const {isSigningUp,signup}=useAuthStore();
  
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
     const success=validateForm();
     if(success===true){
      signup(formData);
     }
    }


  return (
    <div className="h-full flex flex-col items-center py-32 w-full ">
      <div className="flex flex-col items-center">
        <FiMessageSquare className="text-4xl " />
        <h1 className="font-semibold text-2xl">Create Account</h1>
        <p className="text-md font-light">Get started with your free account</p>
      </div>

      <div className="w-full pt-8  flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full sm:w-1/3">
          <div className="relative w-full">
            <p className="font-semibold text-base">Full Name</p>
            <input
            value={formData.fullName}
            onChange={(e)=> setFormData({...formData,fullName:e.target.value})}
              type="text"
              className=" border outline-0 w-full py-2  rounded px-6 "
            />
            <FaRegUser className="absolute  top-9 left-1 " />
          </div>

          <div className="relative">
            <p className="font-semibold text-base mt-4">Email Address</p>
            <input
             value={formData.email}
             onChange={(e)=> setFormData({...formData,email:e.target.value})}
              type="email"
              className="relative border outline-0 w-full  py-2  rounded px-6"
            />
            <MdOutlineMailOutline className="absolute  top-9 left-1 text-lg" />
          </div>

          <div className="relative">
            <p className="font-semibold text-base mt-4">Password</p>
            <input
             value={formData.password}
             onChange={(e)=> setFormData({...formData,password:e.target.value})}
              type={showPassword ? "text" : "password"}
              className="relative border outline-0 w-full py-2 rounded px-6"
            />
            <TbLockPassword className="absolute  top-9 left-1 text-lg" />

            {showPassword ? (
       
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="absolute  top-9 right-2 text-lg"
                />
              
            ) : (
              <FaEyeSlash
              onClick={() => setShowPassword(true)}
              className="absolute  top-9 right-2 text-lg"
            />
            )}
          </div>

          <div>
            <button type="submit" className="bg-blue-400 px-6 py-2 rounded text-white mt-4 w-full text-md font-semibold">Create Account</button>
          </div>
        </form>
        <p className="mt-2">Already have an account ? <Link to='/login' className="underline">Sign in</Link></p>
      </div>
    </div>
  );
};


export default SignUpPage;
