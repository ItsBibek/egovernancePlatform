
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-nepal-blue text-white py-4">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-white/90">Group Project For: E-governance [6th sem CSIT]</p>
        <p className="mt-2">© {new Date().getFullYear()} Government of Nepal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
