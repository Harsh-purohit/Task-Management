import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/project" element={<Project />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
