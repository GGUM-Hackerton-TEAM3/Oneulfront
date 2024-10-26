import { API_BASE_URL } from "../service/app-config"; // Import the defined API_BASE_URL
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
        options.body = isMultipart ? request : JSON.stringify(request); // Use request directly for multipart
    }

    return fetch(API_BASE_URL + api, options)
        .then((response) => {
            if (!response.ok) {
                return response.json().then((json) => {
                    if (response.status === 403) {
                        window.location.href = "/login"; // Redirect if 403
                    }
                    return Promise.reject(json);
                });
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Fetch error:", error); // Log the full error object
            return Promise.reject(error);
        });
}

export function signin(userDTO) {
    const formData = new FormData(); // Create a FormData object
    Object.keys(userDTO).forEach((key) => {
        formData.append(key, userDTO[key]); // Append each field to the FormData object
    });

    return call("/auth/signin", "POST", formData, true) // Set isMultipart to true
        .then((response) => {
            if (response.token) {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                window.location.href = "/"; // Redirect to the main page
            }
        });
}

// Other functions remain unchanged
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO) // Regular JSON request
        .then((response) => {
            if (response.id) {
                window.location.href = "/";
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
