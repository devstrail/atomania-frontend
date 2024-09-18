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