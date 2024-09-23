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
})

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)