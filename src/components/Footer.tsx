
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-nepal-blue text-white mt-10 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Information</h3>
            <p>Government of Nepal</p>
            <p>Singh Durbar, Kathmandu</p>
            <p>Phone: +977-1-4211000</p>
            <p>Email: info@nepal.gov.np</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Ministry Directory</a></li>
              <li><a href="#" className="hover:underline">Public Services</a></li>
              <li><a href="#" className="hover:underline">Legal Documents</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">YouTube</a></li>
              <li><a href="#" className="hover:underline">Viber Community</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p>© {new Date().getFullYear()} Government of Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
