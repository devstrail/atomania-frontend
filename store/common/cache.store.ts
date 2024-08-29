import { defineStore } from 'pinia'
import {cacheService} from '~/services'
import {handleCommonActions} from '~/utils'

export const useCacheStore = defineStore({
    id: 'cache',
    state: () => ({
        items: [],
        stores: [],
        worksheetItems: []
    }),
    actions: {
        async fetchItems() {
            return await handleCommonActions(async () => {
                const response = await cacheService.getItems();
                this.items = response.data ?? [];
            });
        }
    }
});