import React, { useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { IoMdImage } from "react-icons/io";
import { useChatStore } from "./../store/useChatStore";
import { toast } from "react-toastify";

const InputMessage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  
  const { sendMessage, selectedUser } = useChatStore();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return; // Ensure file is selected
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      toast.error("Please select a user to chat.");
      return;
    }

    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear input fields
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      {imagePreview && (
        <div className="relative w-20 h-20 mb-2">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-full object-cover rounded-lg border border-zinc-700"
          />
          <button
            className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            onClick={removeImage}
          >
            ✕
          </button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-emerald-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <input
            type="file"
            id="image-upload"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <IoMdImage className="text-3xl text-gray-600 hover:text-emerald-600 transition duration-200" />
        </label>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`p-2 rounded-full ${
            text.trim() || imagePreview ? "bg-emerald-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          <IoIosSend className="text-3xl" />
        </button>
      </form>
    </div>
  );
};

export default InputMessage;
