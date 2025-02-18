
const BASE_URL = "http://localhost:5005";



export const fetchRecords = async () => {
  try {
    const response = await fetch(`${BASE_URL}/records`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched records:", data); 

    return data; 
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

export const filterRecordsByStyle = async (style) => {
  try {
    const response = await fetch(
      `${BASE_URL}/records?style=${encodeURIComponent(style)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error filtering records by style ${style}:`, error);
    throw error;
  }
};

export const filterRecordsByYear = async (year) => {
  try {
    const response = await fetch(`${BASE_URL}/records?released=${year}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error filtering records by year ${year}:`, error);
    throw error;
  }
};

export const filterRecordsByCountry = async (country) => {
  try {
    const response = await fetch(
      `${BASE_URL}/records?country=${encodeURIComponent(country)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error filtering records by country ${country}:`, error);
    throw error;
  }
};


export const searchRecords = async (params) => {
  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null))
  ).toString();

  try {
    const response = await fetch(`${BASE_URL}/records/search?${queryString}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching records:", error);
    throw error;
  }
};


export const filterRecordsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await fetch(
      `${BASE_URL}/records?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error filtering records by price range ${minPrice}-${maxPrice}:`,
      error
    );
    throw error;
  }
};

