import {defineStore} from 'pinia'
import {contactService} from '~/services'
import {handleCommonActions} from '~/utils'

export const useContactStore = defineStore({
    id: 'contact',
    state: () => ({

    }),
    actions: {
        async sendContact(payload) {
            return await handleCommonActions(async () => {
                return await contactService.sendContact(payload)
            })
        },
    }
});