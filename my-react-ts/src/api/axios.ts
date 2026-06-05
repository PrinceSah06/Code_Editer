import axios,{ type AxiosInstance}from 'axios';


const rawBaseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const api:AxiosInstance = axios.create({
    baseURL: rawBaseURL.endsWith('/api/v1') ? rawBaseURL : `${rawBaseURL}/api/v1`
})




api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;