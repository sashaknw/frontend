
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-100 py-0">
      <div className="container mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-2 -ml-14">
            <img
              src="/TranceManiaGreen.png"
              alt="TranceMania Logo"
              className="object-contain w-48 h-48"
            />
            <div>
              <p className="text-lg font-bold text-gray-100">TranceMania</p>
              <p className="text-sm text-gray-300">
                Curating Rare Trance Selection Since 2011
              </p>
            </div>
          </div>
        </div>

        <div></div>

        <div className="flex justify-between space-x-12 mt-10 ">
   
          <nav className="flex flex-col ">
            <h6 className="font-bold mb-4 text-lg ">Explore</h6>
            <Link to="/" className="text-gray-100 hover:text-[#0e9387] mb-2">
              Home
            </Link>
            <Link
              to="/records"
              className="text-gray-100 hover:text-[#0e9387] mb-2"
            >
              Our Collection
            </Link>
            <Link
              to="/about"
              className="text-gray-100 hover:text-[#0e9387] mb-2"
            >
              About Us
            </Link>
          </nav>

       
          <nav className="flex flex-col">
            <h6 className="font-bold mb-4 text-lg">Legal</h6>
            <Link
              to="/terms"
              className="text-gray-100 hover:text-[#0e9387] mb-2"
            >
              Terms of Use
            </Link>
            <Link
              to="/privacy"
              className="text-gray-100 hover:text-[#0e9387] mb-2"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-gray-100 hover:text-[#0e9387] mb-2"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} TranceMania. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
