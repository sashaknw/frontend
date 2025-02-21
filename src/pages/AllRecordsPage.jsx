import { useState, useEffect } from "react";
import RecordCard from "../components/RecordCard";
import { fetchRecords } from "../services/api";
import AddRecordCard from "../components/AddRecordCard";
import AddRecordButton from "../components/AddRecordButton";

const AllRecordsPage = ({ addToCart }) => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStyle, setSearchStyle] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [yearSort, setYearSort] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecords();

        // Validate and filter records
        const recordsToSet = Array.isArray(data) ? data : data.records || [];
        const validRecords = recordsToSet.filter(
          (record) => record && record.id && record.artist && record.title
        );

        setRecords(validRecords);
        setFilteredRecords(validRecords);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch records:", err);
        setRecords([]);
        setFilteredRecords([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecords();
  }, []);

  useEffect(() => {
    let result = records;

    if (searchTerm) {
      result = result.filter(
        (record) =>
          record.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchStyle) {
      result = result.filter((record) =>
        record.style
          .toLowerCase()
          .split(", ")
          .includes(searchStyle.toLowerCase())
      );
    }

    if (searchCountry) {
      result = result.filter(
        (record) =>
          record.country?.toLowerCase() === searchCountry.toLowerCase()
      );
    }

    if (yearSort === "asc") {
      result.sort((a, b) => {
        const yearA = Number(a.released) || 0;
        const yearB = Number(b.released) || 0;
        return yearA - yearB;
      });
    } else if (yearSort === "desc") {
      result.sort((a, b) => {
        const yearA = Number(a.released) || 0;
        const yearB = Number(b.released) || 0;
        return yearB - yearA;
      });
    }

    setFilteredRecords(result);
  }, [searchTerm, searchStyle, searchCountry, yearSort, records]);

  const uniqueStyles = [
    ...new Set(
      records.flatMap((record) =>
        record.style ? record.style.split(", ") : []
      )
    ),
  ].sort();

  const uniqueCountries = [
    ...new Set(
      records
        .map((record) => record.country)
        .filter((country) => country && country.trim() !== "")
    ),
  ].sort();

   const handleUpdate = (updatedRecord) => {
     setRecords((prevRecords) =>
       prevRecords.map((record) =>
         record.id === updatedRecord.id ? updatedRecord : record
       )
     );
     setFilteredRecords((prevFilteredRecords) =>
       prevFilteredRecords.map((record) =>
         record.id === updatedRecord.id ? updatedRecord : record
       )
     );
   };

  const handleAddRecord = (newRecord) => {
    const updatedRecords = [newRecord, ...records];
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
  };

  const handleDelete = (deletedId) => {
    // Update the records state immediately after successful deletion
    setRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== deletedId)
    );
    setFilteredRecords((prevFilteredRecords) =>
      prevFilteredRecords.filter((record) => record.id !== deletedId)
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
       <img src="/loading.gif" alt="loading gif" className="w-96 " />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Records</h2>
          <p>{error.message || "An unknown error occurred"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen  px-16 py-8 relative bg-[#1a1a1a] min-h-screen text-white">
      <h1 className="text-5xl font-sans font-bold text-right mb-10 mr-14 ">
        __________________________________ our records
      </h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <input
            type="text"
            placeholder="Search by artist or title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg 
              bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              placeholder-gray-500"
          />
        </div>

        <div className="w-full md:w-1/4 lg:w-1/6">
          <select
            value={searchStyle}
            onChange={(e) => setSearchStyle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg 
              bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-gray-900">
              All Styles
            </option>
            {uniqueStyles.map((style) => (
              <option key={style} value={style} className="text-gray-900">
                {style}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 lg:w-1/6">
          <select
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg 
              bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-gray-900">
              All Countries
            </option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country} className="text-gray-900">
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4 lg:w-1/6">
          <select
            value={yearSort}
            onChange={(e) => setYearSort(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg 
              bg-white text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-gray-900">
              Sort by Year
            </option>
            <option value="asc" className="text-gray-900">
              Year (Ascending)
            </option>
            <option value="desc" className="text-gray-900">
              Year (Descending)
            </option>
          </select>
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AddRecordCard
            onAddRecord={handleAddRecord}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            uniqueStyles={uniqueStyles}
          />
          {filteredRecords.map((record) =>
            record && record.id ? (
              <RecordCard
                key={record.id}
                record={record}
                addToCart={addToCart}
                uniqueStyles={uniqueStyles}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ) : null
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AddRecordCard
            onAddRecord={handleAddRecord}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            uniqueStyles={uniqueStyles}
          />
          <div className="text-center text-gray-600 text-xl col-span-full">
            No records found.
          </div>
        </div>
      )}

      <AddRecordButton onClick={() => setIsModalOpen(true)} />

      {(searchTerm || searchStyle || searchCountry || yearSort) && (
        <div className="text-center mt-4 text-gray-600">
          {filteredRecords.length} record(s) found
          {searchTerm && ` matching "${searchTerm}"`}
          {searchStyle && ` in ${searchStyle} style`}
          {searchCountry && ` from ${searchCountry}`}
          {yearSort && ` (sorted by year ${yearSort})`}
        </div>
      )}
    </div>
  );
};

export default AllRecordsPage;
