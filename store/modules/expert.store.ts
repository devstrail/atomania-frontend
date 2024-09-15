import { defineStore } from 'pinia'
import {expertService} from '~/services'
import { handleCommonActions } from '~/utils'
import { usePaginationStore } from '~/store'

export const useExpertStore = defineStore({
    id: 'expert',
    state: () => ({
        searchParam: {
            query: null
        },
        experts: [],
        expert: null,
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
                ...payload
            }
        },
        async fetchExperts(payload = {}) {
            const paginationStore = usePaginationStore();

            return await handleCommonActions(async () => {
                const response = await expertService.get(this.getPayload(payload));
                this.experts = response.data?.data ?? [];
                paginationStore.setPaginationData(response.data?.meta ?? {});
            });
        },
        async storeExpert(payload) {
            return await handleCommonActions(async () => {
                await expertService.store(payload);
                this.fetchExperts();
            });
        },
        async getExpert(id) {
            return await handleCommonActions(async () => {
                const response = await expertService.show(id);
                this.expert = response.data?.data ?? null;
            });
        },
        async updateExpert(id, payload) {
            return await handleCommonActions(async () => {
                await expertService.update(id, payload);
                this.fetchExperts();
            });
        },
        async deleteExpert(id, type = 1) {
            return await handleCommonActions(async () => {
                await expertService.delete(id, type);
                this.fetchExperts();
            });
        },
        async restoreExpert(id) {
            return await handleCommonActions(async () => {
                await expertService.restore(id);
                this.fetchExperts();
            });
        },
    }
});