import { defineStore } from 'pinia'
import { itemService } from '~/services'
import { handleCommonActions } from '~/utils'
import { usePaginationStore } from '~/store'

export const useItemStore = defineStore({
    id: 'item',
    state: () => ({
        searchParam: {
            query: null
        },
        sheetType: 1,
        sheetNumber: 1,
        items: [],
        item: null,
    }),
    actions: {
        initiateSearchParam(payload = {}){
            this.searchParam = {
                ...{
                    query: null
                },
                ...payload
            }
        },
        getPayload(payload = {}){
            const paginationStore = usePaginationStore();

            return {
                ...paginationStore.paginationDataForRequest,
                ...this.searchParam,
                ...{
                    sheet_type: this.sheetType,
                    sheet_no: this.sheetNumber,
                },
                ...payload
            }
        },
        async fetchItems(payload = {}) {
            const paginationStore = usePaginationStore();

            return await handleCommonActions(async () => {
                const response = await itemService.get(this.getPayload(payload));
                this.items = response.data?.data ?? [];
                paginationStore.setPaginationData(response.data?.meta ?? {});
            });
        },
        async storeItem(payload) {
            return await handleCommonActions(async () => {
                await itemService.store(payload);
                this.fetchItems();
            });
        },
        async getItem(id) {
            return await handleCommonActions(async () => {
                const response = await itemService.show(id);
                this.item = response.data?.data ?? null;
            });
        },
        async updateItem(id, payload) {
            return await handleCommonActions(async () => {
                await itemService.update(id, payload);
                this.fetchItems();
            });
        },
        async deleteItem(id, type = 1) {
            return await handleCommonActions(async () => {
                await itemService.delete(id, type);
                this.fetchItems();
            });
        },
        async restoreItem(id) {
            return await handleCommonActions(async () => {
                await itemService.restore(id);
                this.fetchItems();
            });
        },
    }
});