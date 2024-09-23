import axios from 'axios'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Cache-Control': 'no-cache',
        'Accept'       : 'application/json',
        'Access-Control-Allow-Origin': import.meta.env.VITE_ALLOWED_DOMAIN
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        // Directly get the token from localStorage
        const token = localStorage.getItem('auth_token');

        if (token) {
            // Add the token to the Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);