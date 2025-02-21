import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import RecordDetails from "./RecordDetails";

const RecordCard = ({
  record = {},
  onUpdate,
  onDelete,
  uniqueStyles,
  addToCart,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    id,
    artist = "Unknown Artist",
    title = "Untitled Record",
    label = "N/A",
    format = "Vinyl",
    country = "Unknown",
    released = "N/A",
    genre = "Electronic",
    style = "Unknown Style",
    price = "0.00",
    rpm = "N/A",
    image = "/records/.png",
  } = record;

  const styleArray = typeof style === "string" ? style.split(", ") : [];

  const handleCardClick = () => {
    setIsDetailsOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart({
      id,
      artist,
      title,
      price: parseFloat(price),
      image,
      quantity: 1, 
    });

      setShowToast(true);

      
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
  };

  return (
    <>
      {showToast && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
    bg-green-500 text-white 
    px-6 py-3 
    rounded-lg 
    shadow-lg 
    text-center"
        >
          Record successfully added to cart!
        </div>
      )}
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={image || "/records/.png"} /// aqui pilla
            alt={`${artist} - ${title}`}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/records/.png";
            }}
          />
          {/* Best Price !!! */}
          {parseFloat(price) <= 3 && (
            <div className="absolute top-2 left-2">
              <img
                src="/BestPriceSticker.gif"
                alt="Best Price"
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
        </div>

        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{artist}</h2>
          <h3 className="text-lg text-gray-600 mb-3">{title}</h3>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
            <div>
              <strong>Label:</strong> {label}
            </div>
            <div>
              <strong>Country:</strong> {country}
            </div>
            <div>
              <strong>Year:</strong> {released}
            </div>
            <div>
              <strong>RPM:</strong> {rpm}
            </div>
            <div className="col-span-2 mt-2">
              <strong>Price: </strong>
              <span className="text-lg font-bold text-[#1a1a1a]">
                €{parseFloat(price).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap gap-1">
              {styleArray.map((s, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center px-4 py-2 
        bg-black text-white 
        hover:bg-[#5ace8f] hover:text-black 
        rounded-xl 
        transition-colors 
        text-sm"
          >
            <ShoppingCart className="mr-2" size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Record Details Modal */}
      {isDetailsOpen && (
        <RecordDetails
          record={record}
          onClose={() => setIsDetailsOpen(false)}
          onUpdate={(updatedRecord) => {
            onUpdate(updatedRecord);
            setIsDetailsOpen(false);
          }}
          onDelete={(recordId) => {
            onDelete(recordId);
            setIsDetailsOpen(false);
          }}
          uniqueStyles={uniqueStyles}
        />
      )}
    </>
  );
};

export default RecordCard;
