import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="py-5 text-center">
      <ul className="space-y-1 px-3">
        <li className=" hover:rounded-4xl hover:bg-gray-200 border-gray-200 transition-all duration-200">
          <Link to="/" className="block py-5 text-primary rounded-md">
            Home
          </Link>
        </li>

        <li className=" hover:rounded-4xl hover:bg-gray-200 border-gray-200 transition-all duration-200">
          <Link to="/projects" className="block py-5 text-primary rounded-md">
            Projects
          </Link>
        </li>

        <li className=" hover:rounded-4xl hover:bg-gray-200 border-gray-200 transition-all duration-200">
          <Link to="/tasks" className="block py-5 text-primary rounded-md">
            Tasks
          </Link>
        </li>

        <li className=" hover:rounded-4xl hover:bg-gray-200 border-gray-200 transition-all duration-200">
          <Link to="/contact" className="block py-5 text-primary rounded-md">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
