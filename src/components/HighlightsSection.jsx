import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const highlights = [
    {
      id: 1,
      title: 'KADOC / NIGHTRAIN 12" Single',
      author: "Positiva",
      image: "/highlights/highlight1.png",
    },
    {
      id: 2,
      title: "The Silence",
      author: "Mike Koglin",
      image: "/highlights/highlight4.png",
    },
    {
      id: 3,
      title: "Trance Music History",
      author: "Sound of Life",
      URL: "https://www.soundoflife.com/blogs/mixtape/trance-music-history",
      image: "/highlights/highlight3.jpg",
    },
    {
      id: 4,
      title: "Beyond 2000",
      author: "trance[]control",
      image: "/highlights/highlight2.jpg",
    },
    {
      id: 5,
      title: "Pump Up the Volume 1987",
      author: "Marrs",
      image: "/highlights/highlight5.png",
    },
  ];

  const visibleHighlights = highlights.slice(currentIndex, currentIndex + 3);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, highlights.length - 3)
    );
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-sans font-bold text-gray-900 mb-6">
          ______________________________________________ highlights
        </h2>
        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            {visibleHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-gray-50 shadow-md rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {highlight.URL ? (
                    <a
                      href={highlight.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-gray-900 mb-2 hover:text-[#5ace8f]"
                    >
                      {highlight.title}
                    </a>
                  ) : (
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                  )}
                  <p className="text-gray-700">{highlight.author}</p>
                </div>
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
            </button>
          )}
          {currentIndex < highlights.length - 3 && (
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlights;