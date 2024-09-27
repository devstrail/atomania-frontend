import {apiClient} from '~/services';

export const subscriberService = {
    async storeSubscriber(payload) {
        return apiClient.post('/subscribers', payload)
    },
};