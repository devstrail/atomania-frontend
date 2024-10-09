import {apiClient} from '~/services';

export const authService = {
    async getCookieCredential() {
        return apiClient.get('/sanctum/csrf-cookie')
    },
    async login(payload) {
        return apiClient.post('/auth/login', payload)
    },
    async register(payload) {
        return apiClient.post('/auth/register', payload)
    },
    async authorize(payload) {
        return apiClient.post('/auth/authenticate', payload)
    },
    async forgotPassword(payload) {
        return apiClient.post('/forgot-password', payload)
    },
    async resetPassword(payload) {
        return apiClient.post('/reset-password', payload)
    },
    async logout() {
        return apiClient.post('/auth/logout')
    },
};