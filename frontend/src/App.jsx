import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const mode = useSelector((state) => state.login.mode);
  // console.log(mode);

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-10 min-h-screen bg-[#F9FAFB]">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "10px",
            background: "#1f2937",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
      
      <Navbar />
      {mode && <Auth />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/projects/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
