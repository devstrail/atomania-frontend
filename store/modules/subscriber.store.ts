import {defineStore} from 'pinia'
import {subscriberService} from '~/services'
import {handleCommonActions} from '~/utils'

export const useSubscriberStore = defineStore({
    id: 'subscriber',
    state: () => ({

    }),
    actions: {
        async storeSubscriber(payload) {
            return await handleCommonActions(async () => {
                return await subscriberService.storeSubscriber(payload)
            })
        },
    }
});