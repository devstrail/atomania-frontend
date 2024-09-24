import {apiClient} from '~/services'

export const orderService = {
    async get(payload) {
        return apiClient.get('/orders', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/orders', payload)
    },
    async show(id) {
        return apiClient.get(`/orders/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/orders/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/orders/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/orders/restore/${id}`)
    },
};