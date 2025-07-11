
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-nepal-blue text-white shadow-md">
      <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/120px-Flag_of_Nepal.svg.png" 
            alt="Nepal Flag" 
            className="h-10 mr-3"
          />
          <div>
            <h1 className="text-xl font-bold">E-Governance Project</h1>
            <p className="text-sm">Digital Nepal Initiative</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
