import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useAuthStore } from "./../store/useAuthStore";
const ProfilePage = () => {
  const { authUser,updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  
 
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const image = reader.result;
      setSelectedImage(image);
      await updateProfile({profilePic: image  });
    };
  };

  return (
    <div className="pt-20 max-w-2xl mx-auto ">
      <div className=" bg-[#14181e] flex flex-col items-center p-10 rounded">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-md">Your Account Information</p>
          <label className="relative" htmlFor="avatar upload">
            <img
              className="size-32 rounded-full"
              src={selectedImage || authUser?.profilePic || "/avatar.png"}
              alt="Profile Picture"
            />
            <input
              type="file"
              id="avatar upload"
              onChange={handleImageUpload}
              className="hidden object-cover"
            />
            <CiCamera className="text-3xl absolute top-20 right-3 text-black bg-gray-100 rounded-full" />
          </label>
          <p className="text-sm">Click the camera icon to upload your photo</p>
        </div>

        <div className=" w-1/2 pt-6">
          <div className="relative w-full ">
            <p className="font-semibold text-sm">Full Name</p>
            <p
              value={authUser?.fullName}
              type="text"
              className=" border outline-0 w-full py-2  rounded px-6 "
            >
              {authUser.fullName}
            </p>

            <FaRegUser className="absolute  top-8 left-1 " />
          </div>

          <div className="relative">
            <p className="font-semibold text-sm mt-4 ">Email Address</p>
            <p
              value={authUser?.email}
              placeholder={authUser?.email}
              type="email"
              className=" border outline-0 w-full py-2  rounded px-6  ">
                   {authUser.email}
              </p>
        
            <MdOutlineMailOutline className="absolute  top-8 left-1 text-lg" />
          </div>

          <div className="flex flex-col gap-2 pt-8">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <div className="flex items-center justify-between border-b-1 border-gray-600">
              <p>Member Since</p>
              <p>{authUser.createdAt?.split("T")[0]}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p>Account Status</p>
              <p className="text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
