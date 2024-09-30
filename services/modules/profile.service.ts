import { apiClient } from '~/services'

export const profileService = {
    async get() {
        return apiClient.get('/auth/whoAmI')
    },
    async updateAvatar(payload) {
        return apiClient.post('/users/avatar', payload)
    },
    async update(payload, id) {
        return apiClient.put(`/users/${id}`, payload)
    }
};