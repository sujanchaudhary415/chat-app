import {create} from "zustand";
import { axiosInstance } from './../lib/axios';

export const useChatStore = create((set) => ({
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
      set({ messages: res.data, selectedUser: userId });
    } catch (error) {
      console.error("Error in getting messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  //optimize later
  setSelectedUser: (selectedUser) => set({ selectedUser }),

}))