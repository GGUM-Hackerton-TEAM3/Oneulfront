let backendHost;

const hostname = window && window.location && window.location.hostname;

const DOMAIN = "https://codi.page";

console.log("hostname", hostname);

backendHost = DOMAIN;

export const API_BASE_URL = `${backendHost}`;
