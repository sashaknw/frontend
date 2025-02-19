import React from "react";
import Highlights from "../components/HighlightsSection";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative">
        <div className="relative">
          <img
            src="/TranceManiaBackground.png"
            alt="Big Cover"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute top-1/3 right-10 transform -translate-y-1/2">
            <a
              href="/allrecordspage"
              className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-blue-700 transition duration-300 shadow-lg inline-block"
            >
              Explore Our Records
            </a>
            <div className="mt-6 max-w-md text-gray-800 text-3xl font-bold shadow-text">
              Dive into a World of Sonic Exploration, Where Every Record Tells a
              Story
            </div>
          </div>
        </div>

        {/* Highlights section */}
        <Highlights />

        {/* Notes section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
              Independent purveyors of great music, since 1976
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              We first opened in 1976, west London, on the doorstep of punk.
              Forty-four years later, we're still celebrating the most exciting
              new music - come say hello.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Community
                </h3>
                <p className="text-gray-700 overline">
                  Artists are our customers, not just inspiration
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Experience
                </h3>
                <p className="text-gray-700 overline">
                  Selling great music since 1976
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Free shipping
                </h3>
                <p className="text-gray-700 overline">
                  On DE orders over 75€ and 100€ in the EU
                </p>
                <p className="text-gray-700">region</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Excellent service
                </h3>
                <p className="text-gray-700 overline">
                  We are rated 'Excellent' (4.4 stars) on
                </p>
                <p className="text-gray-700">Trustpilot by our customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
