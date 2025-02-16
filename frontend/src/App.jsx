import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const App = () => {
  const { authUser, isCheckingAuth,checkAuth } = useAuthStore();

  useEffect(() => {
     checkAuth()
  },[checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div>
        <div className="h-screen flex items-center justify-center">
          <Loader className="animate-spin size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#3A2D28] px-6 py-2 text-[#CBAD8D] ">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
