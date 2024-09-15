import {apiClient} from '~/services'

export const machineService = {
    async get(payload) {
        return apiClient.get('/machines', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/machines', payload)
    },
    async show(id) {
        return apiClient.get(`/machines/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/machines/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/machines/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/machines/restore/${id}`)
    },
};