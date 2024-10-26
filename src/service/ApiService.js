import { API_BASE_URL } from "../service/app-config"; // Import the defined API_BASE_URL
import axios from 'axios';

const ACCESS_TOKEN = "ACCESS_TOKEN"; // Keep ACCESS_TOKEN declaration

export const call = async (url, method, request = null, isMultipart = false) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN); // Get the access token

    const headers = {
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json', // For multipart/form-data or regular JSON requests
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}), // Add Authorization header only if token exists
    };

    const config = {
        method,
        url: `${API_BASE_URL}${url}`, // Ensure the API_BASE_URL is prepended to the URL
        headers,
        data: request, // Axios uses 'data' instead of 'body'
    };

    try {
        const response = await axios(config);
        // Check if the response status indicates a successful request
        if (response.status === 200) {
            return response.data; // Return the data received from the backend
        } else {
            // Handle non-200 responses
            console.error(`Error: Received status ${response.status}`);
            return Promise.reject(response.data); // Reject with the response data for further handling
        }
    } catch (error) {
        // Handle specific error cases
        if (error.response) {
            if (error.response.status === 403) {
                window.location.href = "/login"; // Redirect to login on forbidden access
            }
            console.error("Error response data:", error.response.data);
            return Promise.reject(error.response.data); // Reject with the error response
        } else {
            console.error("Request error:", error.message);
            return Promise.reject(error.message); // Reject with the error message
        }
    }
};

// 로그인 요청 처리
export const signin = async (userDTO) => {
    const response = await call("/auth/signin", "POST", userDTO); // userDTO를 JSON 형식으로 전송
    if (response.token) {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        window.location.href = "/main"; 
    }
};

// 사용자 회원가입 요청 처리
export const signup = async (userDTO) => {
    const formData = new FormData(); 
    // userDTO의 각 필드를 FormData에 추가
    Object.keys(userDTO).forEach((key) => {
        formData.append(key, userDTO[key]); 
    });
    const response = await call("/auth/signup", "POST", formData, true); // Use multipart for signup
    if (response.email) {
        window.location.href = "/login"; 
    }
};

// // 백엔드에서 아이템 목록 가져오기
// export const fetchItems = async () => {
//     const response = await call("/items", "GET"); // Using call to ensure consistent API usage
//     return response; // Return the fetched data
// };

// 카테고리 관련 api 함수
export const fetchMeetingsByCategory = async (categoryName) => {
    return call(`/api/categories/search/meetings?categoryName=${categoryName}`, "GET");
};  
