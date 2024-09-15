import {apiClient} from '~/services'

export const droneService = {
    async get(payload) {
        return apiClient.get('/drone', {params: payload})
    },
    async store(payload) {
        return apiClient.post('/drone', payload)
    },
    async show(id) {
        return apiClient.get(`/drone/${id}`)
    },
    async update(id, payload) {
        return apiClient.post(`/drone/${id}?_method=put`, payload)
    },
    async delete(id, type = 1) {
        return apiClient.delete(`/drone/${id}/${type}`)
    },
    async restore(id) {
        return apiClient.post(`/drone/restore/${id}`)
    },
};