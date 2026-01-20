import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(false);

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex justify-between items-center gap-6">
        <div>
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="cursor-pointer my-3"
            onClick={() => setSidebar(!sidebar)}
          />
          {sidebar && (
            <div className="absolute top-20 left-0 w-50 h-80  bg-[#F9FAFB] shadow-lg z-10">
              <Sidebar />
            </div>
          )}
        </div>
        <Link to="/">
          <img src={logo} alt="WorkSync" className="h-10 w-auto" />
        </Link>
      </div>

      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search tasks or projects"
          className="w-lg h-10 outline-none rounded-full p-4 bg-gray-100 "
        />
      </div>

      {user ? (
        <div className="text-white">{user.name}</div>
      ) : (
        <div className="my-2 text-lg font-medium flex gap-2">
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
          <span className="text-primary">{" / "}</span>
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
