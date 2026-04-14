import axios from 'axios';

const API = axios.create({
    // Updated to port 8084 as per your setup
    baseURL: 'http://localhost:8084/api' 
});

// This sends your JWT token automatically with every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;