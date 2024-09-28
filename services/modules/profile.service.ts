import { apiClient } from '~/services'

export const profileService = {
    async get() {
        return apiClient.get('/auth/whoAmI')
    },
    async update(payload, id) {
        return apiClient.put(`/users/${id}`, payload)
    }
};