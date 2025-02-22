import {create} from "zustand";
import { axiosInstance } from './../lib/axios';
import { toast } from 'react-toastify';

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  // Fetch users
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.error("Error in getting users:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data});
    } catch (error) {
      console.error("Error in getting messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const {messages,selectedUser}=get();
    try {
       const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
       set({ messages: [...messages, res.data]});
    } catch (error) {
        console.error("Error in sending message:", error);
        toast.error("Failed to send message. Please try again.");

    }
     
  },

  //optimize later
  setSelectedUser: (selectedUser) => set({ selectedUser }),

}))