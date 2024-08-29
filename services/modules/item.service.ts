import {apiClient} from '~/services'

export const itemService = {
    async get(payload) {
        return apiClient.get('/items', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/items', payload)
    },
    async show(id) {
        return apiClient.get(`/items/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/items/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/items/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/items/restore/${id}`)
    },
};