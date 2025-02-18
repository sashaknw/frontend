
const RecordCard = ({ record = {} }) => {
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
    image = "/records/placeholder.png",
  } = record;

  const styleArray = typeof style === "string" ? style.split(", ") : [];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={image}
          alt={`${artist} - ${title}`}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/records/placeholder.png";
          }}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded">
          €{price}
        </div>
      </div>

      <div className="p-4">
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
        </div>

        <div className="flex justify-between items-center">
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
    </div>
  );
};

export default RecordCard;
