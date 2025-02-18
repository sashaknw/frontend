import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Brand Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/TranceManiaLogo.png"
            alt="TranceMania Logo"
            width="150"
            height="100"
            className="object-contain"
          />
          <p className="text-sm text-gray-700">
            TranceMania
            <br />
            Curating Rare Trance Selection Since 2011
          </p>
        </div>

        {/* Explore Links */}
        <nav className="flex flex-col">
          <h6 className="font-bold mb-4 text-lg">Explore</h6>
          <Link to="/" className="text-gray-600 hover:text-gray-900 mb-2">
            Home
          </Link>
          <Link
            to="/records"
            className="text-gray-600 hover:text-gray-900 mb-2"
          >
            Our Collection
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 mb-2">
            About Us
          </Link>
        </nav>

        {/* Legal Links */}
        <nav className="flex flex-col">
          <h6 className="font-bold mb-4 text-lg">Legal</h6>
          <Link to="/terms" className="text-gray-600 hover:text-gray-900 mb-2">
            Terms of Use
          </Link>
          <Link
            to="/privacy"
            className="text-gray-600 hover:text-gray-900 mb-2"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className="text-gray-600 hover:text-gray-900 mb-2"
          >
            Cookie Policy
          </Link>
        </nav>
      </div>

      <div className="border-t border-gray-200 mt-8 py-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} TranceMania. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
