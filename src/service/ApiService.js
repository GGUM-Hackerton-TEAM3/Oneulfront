import { API_BASE_URL } from "../service/app-config"; // Import the defined API_BASE_URL
import axios from 'axios';

const ACCESS_TOKEN = "ACCESS_TOKEN"; // Keep ACCESS_TOKEN declaration


export function call(api, method, request, isMultipart = false) {
    let headers = new Headers();
    
    if (!isMultipart) {
        headers.append("Content-Type", "application/json"); // For regular JSON requests
    }
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        method: method,
        headers: headers,
    };
    
    if (request) {
        options.body = isMultipart ? request : JSON.stringify(request);
    }

    return fetch(API_BASE_URL + api, options)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((json) => {
                    if (response.status === 403) {
                        window.location.href = "/login";
                    }
                    return Promise.reject(json);
                });
            }
            return response.json();
        })
        .catch((error) => {
            if (error.status === 403) {
                window.location.href = "/auth/signup"; // 오류 상태에 따른 리다이렉트
            }
            console.error("Fetch error:", error); 
        });
}

// 로그인 요청 처리
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO) // userDTO를 JSON 형식으로 전송
        .then((response) => {
            if (response.token) {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                window.location.href = "/main"; 
            }
        });
}

// 사용자 회원가입 요청 처리
export function signup(userDTO) {
    const formData = new FormData(); 

    // userDTO의 각 필드를 FormData에 추가
    Object.keys(userDTO).forEach((key) => {
        formData.append(key, userDTO[key]); 
    });

    return call("/auth/signup", "POST", formData, true)
        .then((response) => {
            console.log('Signup response:', response); 

            if (response.email) {
                window.location.href = "/login"; 
            }
        })
        .catch((error) => {
            console.log("Oops!");
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/auth/signup";
            }
            return Promise.reject(error);
        });
}



export function signout() {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "/";
}



// 백엔드에서 아이템 목록 가져오기(axios를 사용하여 지정된 엔드)
export const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/items`); 
        return response.data; // Return the data received from the backend
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error; 
    }
};

//일반적인 API 호출 처리
export const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
        const config = {
            method,
            url: `${API_BASE_URL}${endpoint}`,
            data,
        };

        const response = await axios(config);
        return response.data; 
    } catch (error) {
        console.error(`Error in API call to ${endpoint}:`, error);
        throw error; 
    }
};



//카테고리 관련 api함수
export const fetchMeetingsByCategory = async (categoryName) => {
    try {
        const response = await axios.get(`/api/categories/search/meetings`, {
            params: { category: categoryName }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch meetings by category:", error);
        throw error;
    }
};