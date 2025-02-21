import { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon"; 

export default function NavBar({ cartItemCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a1a] text-gray-100 py-0.5">
      <div className="container mx-auto px-2 flex justify-between items-center">
      
        <Link
          to="/"
          className="text-white text-xl font-bold flex items-center pl-0"
        >
          <img
            src="/TranceManiaWhite.png"
            alt="Logo"
            className="h-30 w-30 object-contain object-top overflow-hidden"
          />
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-[#0e9387] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/records"
            className="text-gray-300 hover:text-[#0e9387] transition-colors"
          >
            Records
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-[#0e9387] transition-colors"
          >
            About
          </Link>
          <CartIcon cartItemCount={cartItemCount} />
        </div>
{/* hamburguesa */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-current"></span>
            <span className="block w-8 h-0.5 bg-current"></span>
            <span className="block w-8 h-0.5 bg-current"></span>
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4 px-2">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/records"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Records
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <CartIcon cartItemCount={cartItemCount} />
          </div>
        </div>
      )}
    </nav>
  );
}
