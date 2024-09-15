import {apiClient} from '~/services'

export const expertService = {
    async get(payload) {
        return apiClient.get('/expert', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/expert', payload)
    },
    async show(id) {
        return apiClient.get(`/expert/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/expert/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/expert/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/expert/restore/${id}`)
    },
};