import { useState } from "react";
import { addRecord } from "../services/api";

const INITIAL_FORM_STATE = {
  artist: "",
  title: "",
  label: "",
  format: 'Vinyl, 12"',
  country: "",
  released: "",
  genre: "Electronic",
  style: "",
  price: "",
  rpm: "",
  image: null,
};

// Helper function for image processing
// const processImageForStorage = (base64String) => {
//   if (!base64String) return null;
//   try {
//     return base64String; // Just return the full base64 string
//   } catch (error) {
//     console.error("Error processing image:", error);
//     return null;
//   }
// };


// Main Component
const AddRecordCard = ({
  onAddRecord,
  isModalOpen,
  setIsModalOpen,
  uniqueStyles,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [imagePreview, setImagePreview] = useState(null);
  const [customStyle, setCustomStyle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const { artist, title, released, price } = formData;
    const errors = [];

    if (!artist?.trim()) errors.push("Artist is required");
    if (!title?.trim()) errors.push("Title is required");
    if (released && (released < 1900 || released > new Date().getFullYear())) {
      errors.push("Invalid release year");
    }
    if (price && price < 0) errors.push("Price cannot be negative");

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setError(null);

    if (type === "number") {
      const parsedValue = value === "" ? "" : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const fullImage = reader.result; 
        setFormData((prev) => ({
          ...prev,
          image: fullImage, 
        }));
        setImagePreview(fullImage); 
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);

    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join("\n"));
      return;
    }

    const newRecord = {
      ...formData,
      released: formData.released || null,
      price: formData.price || null,
      style:
        formData.style === "Other" ? customStyle.trim() : formData.style.trim(),
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    try {
      const savedRecord = await addRecord(newRecord);
      onAddRecord(savedRecord);
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message || "Failed to add record. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
return (
  <>
    <div
      onClick={() => setIsModalOpen(true)}
      className="border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300 h-full min-h-[400px] rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <p className="text-gray-600 mt-4">Add New Record</p>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add New Record</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-600 hover:text-gray-900 text-3xl font-light"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
       
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                placeholder="Artist *"
                required
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title *"
                required
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                placeholder="Label"
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="number"
                name="released"
                value={formData.released}
                onChange={handleChange}
                placeholder="Release Year"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Style</option>
                {uniqueStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>

              {formData.style === "Other" && (
                <input
                  type="text"
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="Enter custom style"
                  className="mt-2 w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <select
                name="rpm"
                value={formData.rpm}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select RPM</option>
                <option value="33">33 RPM</option>
                <option value="45">45 RPM</option>
                <option value="78">78 RPM</option>
              </select>
            </div>

           
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="mt-4 w-32 h-32 object-cover rounded mx-auto"
                />
              )}
            </div>

     
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
);
  
};

export default AddRecordCard;
