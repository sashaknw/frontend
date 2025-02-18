import { useState, useEffect } from "react";
import RecordCard from "../components/RecordCard";
import { fetchRecords } from "../services/api";

const AllRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStyle, setSearchStyle] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [yearSort, setYearSort] = useState("");


  useEffect(() => {
    const loadRecords = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecords();

 
        const recordsToSet = Array.isArray(data) ? data : data.records || [];

        setRecords(recordsToSet);
        setFilteredRecords(recordsToSet);
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
        const yearA =
          typeof a.released === "number" ? a.released : parseInt(a.released);
        const yearB =
          typeof b.released === "number" ? b.released : parseInt(b.released);
        return yearA - yearB;
      });
    } else if (yearSort === "desc") {
      result.sort((a, b) => {
        const yearA =
          typeof a.released === "number" ? a.released : parseInt(a.released);
        const yearB =
          typeof b.released === "number" ? b.released : parseInt(b.released);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our Vinyl Collection
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
          {filteredRecords.map((record) =>
            record && record.id ? (
              <RecordCard key={record.id} record={record} />
            ) : null
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl">
          No records found.
        </div>
      )}


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
