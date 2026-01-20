import React from "react";

const Sidebar = () => {
  return (
    <div className="py-5 text-center">
      <ul>
        <li className="text-primary py-5 rounded-md border-b-2 border-gray-200">Home</li>
        <li className="text-primary py-5 rounded-md border-b-2 border-gray-200">Projects</li>
        <li className="text-primary py-5 rounded-md border-b-2 border-gray-200">Tasks</li>
      </ul>
    </div>
  );
};

export default Sidebar;
