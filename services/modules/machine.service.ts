import {apiClient} from '~/services'

export const machineService = {
    async get(payload) {
        return apiClient.get('/farming-tools', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/farming-tools')
    },
    async show(id) {
        return apiClient.get(`/farming-tools/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/farming-tools/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/farming-tools/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/farming-tools/restore/${id}`)
    },
    async save(payload) {
        return apiClient.post('/favorites', payload)
    },
    async filters() {
        return apiClient.get('/farming-tools/filters')
    },
};