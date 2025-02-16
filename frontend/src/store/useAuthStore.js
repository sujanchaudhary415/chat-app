import { create } from "zustand";
import { axiosInstance } from "./../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp:false,

  isSigningIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth check", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); 
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully! 🎉"); // Show success toast
    } catch (error) {
      console.log("Error in signup", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login:async(data) => {
     set({ isSigningIn: true });
     try {
        const res=await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully!"); // Show success toast
     } catch (error) {
        console.log("Error in login", error);
        toast.error(error.response.data.message || "Login failed. Please try again.");
     }
     finally {
        set({ isSigningIn: false });
     }
  },


  logout:async()=>{
    try {
      await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully!"); // Show success toast
    } catch (error) {
        toast.error(error.response.data.message);
    }
  }
  






}));
