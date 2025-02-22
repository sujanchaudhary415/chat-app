import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";
import { useChatStore } from "./../store/useChatStore";
import { useAuthStore } from './../store/useAuthStore';

const ChatContainer = () => {
  const { isMessagesLoading, messages, getMessages, selectedUser } =
    useChatStore();
    const {authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Fetch messages when the selected user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full p-4 w-full">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex my-2 ${
                message.senderId === selectedUser._id
                  ? "justify-start"
                  : "justify-end "
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs text-white flex items-center gap-4 ${
                  message.senderId === selectedUser._id
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                <p className="bg-gray-900 px-4 py-1 rounded">{message.text}</p>
                <img
                  src={
                    message.senderId !== selectedUser._id
                      ? selectedUser.profilePic || "./avatar.png"
                      : authUser.profilePic ||  "./avatar.png"
                  }
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                />
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <InputMessage />
    </div>
  );
};

export default ChatContainer;
