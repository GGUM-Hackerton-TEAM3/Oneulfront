import axios from 'axios'; // Import axios first

// Configuration for API
const DOMAIN = "https://codi.page"; // Ensure this is your backend host
export const API_BASE_URL = `${DOMAIN}`; // Declare API_BASE_URL once

// API 요청을 위한 기본 구성
const method = 'GET'; // Change to 'POST', 'PUT', 'DELETE', etc., as needed
const url = "/api/categories"; 
const headers = {
    'Content-Type': 'application/json',
    // Additional headers can be set as needed
};
const request = {
    // Data to include in the request body, e.g., { key: value }
};

// API 호출을 위한 구성 객체
const config = {
    method,
    url: `${API_BASE_URL}${url}`, // Ensure API_BASE_URL is prepended to the URL
    headers,
    data: request, // Axios uses 'data' instead of 'body'
};

console.log('API Call:', config); // Debugging: Check the API call details

