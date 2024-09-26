import {apiClient} from '~/services';

export const contactService = {
    async sendContact(payload) {
        return apiClient.post('/contacts', payload)
    },
};