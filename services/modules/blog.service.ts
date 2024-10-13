import {apiClient} from '~/services';

export const blogService = {
    async get(payload) {
        return apiClient.get('/blogs', {params: payload})
    },
    async show(id) {
        return apiClient.get(`/blogs/${id}`)
    },
};