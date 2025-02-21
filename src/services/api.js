// services/api.js
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-wrw5.onrender.com/api";

console.log("Current API URL:", BASE_URL);

const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Get all records
export const fetchRecords = () => fetchApi("/records");

// Get a single record by ID
export const fetchRecord = (id) => fetchApi(`/records/${id}`);

// Add a new record
export const addRecord = (record) => {
  console.log("API call image length:", record.image?.length);
  return fetchApi("/records", {
    method: "POST",
    body: JSON.stringify(record),
  });
};

// Update a record
export const updateRecord = (id, record) =>
  fetchApi(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(record),
  });

// Delete a record
export const deleteRecord = (id) =>
  fetchApi(`/records/${id}`, {
    method: "DELETE",
  }).then(() => true);

// Filter records by style
export const filterRecordsByStyle = (style) =>
  fetchApi(`/records?style=${encodeURIComponent(style)}`);

// Filter records by year
export const filterRecordsByYear = (year) =>
  fetchApi(`/records?released=${year}`);

// Filter records by country
export const filterRecordsByCountry = (country) =>
  fetchApi(`/records?country=${encodeURIComponent(country)}`);

// Filter records by price range
export const filterRecordsByPriceRange = (minPrice, maxPrice) =>
  fetchApi(`/records?price_gte=${minPrice}&price_lte=${maxPrice}`);

// Search records with multiple parameters
export const searchRecords = (params) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    )
  ).toString();

  return fetchApi(`/records?${queryString}`);
};
