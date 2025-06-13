import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checking user");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("You created an account successfully");
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong while signing up";
      toast.error(errMsg);
      console.log("Error in signup:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isLogin: false });
      toast.success("You logged out successfully");
    } catch (error) {
      console.log("Error in logout:", error);
      toast.error("Something went wrong while logging out");
    }
  },

  login: async (data) => {
    set({isLogin:true});
    try {
      const res = await axiosInstance.post("/auth/login",data);
      set({authUser:res.data,isLogin : false});
      toast.success("You logged in successfully");
      
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong while logging in";
      toast.error(errMsg);
      console.log("Error in login:", error);
      
    }
  },
  updateProfile:async(data)=>{
    set({isUpdatingProfile:true});
    try {
      const res = await axiosInstance.put("/auth/update-profile",data);
      set({authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong while updating profile";
      toast.error(errMsg);
      console.log("Error in updating profile:", error);
    } finally {
      set({isUpdatingProfile:false});
    }
  },
}));
