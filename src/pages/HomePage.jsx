
import Highlights from "../components/HighlightsSection";
import ImageCarousel from "../components/Carousel";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="w-screen -mt-4 bg-[#1a1a1a] h-8 overflow-hidden">
        <div className="flex">
          <img
            src="/SavingsBannerBlack.gif"
            alt="Banner"
            className="h-8 object-contain "
          />
          {/* Second banner only shows on larger screens */}
          <img
            src="/SavingsBannerBlack.gif"
            alt="Banner"
            className="hidden lg:block h-8 object-contain -ml-14 "
          />
        </div>
      </div>

      <div className="relative w-full">
        <div className="relative w-full">
          <img
            src="/TranceManiaBackground.png"
            alt="Big Cover"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute top-1/3 right-4 sm:right-8 lg:right-64 transform -translate-y-1/2">
            <div className="flex flex-col items-start">
              <Link
                to="/records"
                className="bg-[#5ace8f] text-black font-bold py-4 px-8 rounded-lg text-2xl hover:bg-[#1a1a1a] hover:text-white transition duration-300 shadow-lg inline-block"
              >
                Explore Our Records
              </Link>

              <div className="mt-6 text-gray-800 text-3xl font-bold shadow-text ml-auto">
                <div className="max-w-md ml-auto">
                  Dive into a World of Sonic Exploration, Where Every Record
                  Tells a Story
                </div>
              </div>
            </div>
          </div>
        </div>

        <Highlights />

        {/* fundacion section */}

        <div className="bg-gray-50 py-12 w-full">
          <div className="max-w-7xl mx-auto mb-16 px- sm:px-6 lg:px-8  overflow-hidden">
            <h2 className="text-5xl font-sans font-bold text-gray-900 mb-8">
              Independent purveyors of great music, since 2011
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Founded in 2011 in Las Palmas de Gran Canaria, our record store
              has been a home for the best in techno and trance. Over the past
              years, we've continued to curate the sounds that keep the beat
              alive. Swing by and dive into the rhythms of yesterday and
              tomorrow!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="ml-24 ">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Community
                </h3>
                <p className="text-gray-800 overline">
                  Artists are our customers, not just inspiration
                </p>
              </div>
              <div className="ml-24 mb-4 ">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Experience
                </h3>
                <p className="text-gray-700 overline">
                  Selling great music since 2011
                </p>
              </div>
              <div className="ml-24  ">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Free shipping
                </h3>
                <p className="text-gray-700 overline">
                  On ES orders over 25€ and 50€ in the EU
                </p>
                <p className="text-gray-700">region</p>
              </div>
              <div className="ml-24  ">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
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

        {/* carousel */}
        <ImageCarousel />
      </div>
    </div>
  );
};

export default HomePage;
