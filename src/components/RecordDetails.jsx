import { useState } from "react";
import { updateRecord, deleteRecord } from "../services/api";
import EditRecordForm from "./EditRecordForm";

const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") {
    return "—";
  }
  const numPrice = parseFloat(price);
  return isNaN(numPrice) ? "—" : `$${numPrice.toFixed(2)}`;
};

const RecordDetails = ({
  record,
  onClose,
  onUpdate,
  onDelete,
  uniqueStyles,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await deleteRecord(record.id);
      if (response) {
        onDelete(record.id);
        onClose();
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete record. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // If in editing mode, show the EditRecordForm
  if (isEditing) {
    return (
      <EditRecordForm
        record={record}
        onClose={() => setIsEditing(false)}
        onUpdate={onUpdate}
        uniqueStyles={uniqueStyles}
      />
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Record Details</h2>
          <button
            onClick={onClose}
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

        {/* Record Image */}
        {record.image && (
          <div className="mb-6 flex justify-center">
            <img
              src={record.image}
              alt="Record Cover"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/records/placeholder.png";
              }}
            />
          </div>
        )}

        {/* Record Details */}
        <div className="space-y-4">
          {[
            { label: "Artist", value: record.artist },
            { label: "Title", value: record.title },
            { label: "Label", value: record.label },
            { label: "Country", value: record.country },
            { label: "Released", value: record.released },
            { label: "Style", value: record.style },
            { label: "Price", value: formatPrice(record.price) },
            { label: "RPM", value: record.rpm },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-gray-200 rounded-lg p-3 bg-gray-50"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-gray-800">{item.value || "—"}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-black text-white rounded-xl hover:bg-white hover:text-black transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
