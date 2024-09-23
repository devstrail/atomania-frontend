import { apiClient } from '~/services'

export const profileService = {
    async get() {
        return apiClient.get('/auth/whoAmI')
    },
    async updateAvatar(payload) {
        return apiClient.post('/profile/avatar', payload)
    },
    async updatePhone(payload) {
        return apiClient.put('/profile/phone', payload)
    }
};