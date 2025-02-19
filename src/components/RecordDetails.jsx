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
      <div className="bg-white p-8 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Record Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
          <div className="mb-6">
            <img
              src={record.image}
              alt="Record Cover"
              className="w-32 h-32 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/records/placeholder.png";
              }}
            />
          </div>
        )}

        {/* Record Details */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Artist</h3>
            <p className="text-gray-700">{record.artist || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Title</h3>
            <p className="text-gray-700">{record.title || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Label</h3>
            <p className="text-gray-700">{record.label || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Country</h3>
            <p className="text-gray-700">{record.country || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Released</h3>
            <p className="text-gray-700">{record.released || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Style</h3>
            <p className="text-gray-700">{record.style || "—"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Price</h3>
            <p className="text-gray-700">{formatPrice(record.price)}</p>
          </div>

          <div>
            <h3 className="font-semibold">RPM</h3>
            <p className="text-gray-700">{record.rpm || "—"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
