// src/config.js
const config = {
  development: {
    apiUrl: "http://localhost:5005/api",
  },
  production: {
    apiUrl: "https://backend-wrw5.onrender.com/", // Replace with your actual Render URL
  },
};

const environment = process.env.NODE_ENV || "development";
export const apiUrl = config[environment].apiUrl;
