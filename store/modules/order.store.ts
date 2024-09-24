import { defineStore } from 'pinia'
import {orderService} from '~/services'
import { handleCommonActions } from '~/utils'
import { usePaginationStore } from '~/store'

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        searchParam: {
            query: null
        },
        orders: [],
        order: null,
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
            const paginationStore = usePaginationStore()

            return {
                ...paginationStore.paginationDataForRequest,
                ...this.searchParam,
                ...payload
            }
        },
        async fetchOrders(payload = {}) {
            const paginationStore = usePaginationStore()

            return await handleCommonActions(async () => {
                const response = await orderService.get(this.getPayload(payload))
                this.order = response.data?.data?.data ?? []
                paginationStore.setPaginationData(response.data?.meta ?? {})
            });
        },
        async storeOrder(payload) {
            return await handleCommonActions(async () => {
                await orderService.store(payload)
            });
        },
        async getOrder(id) {
            return await handleCommonActions(async () => {
                const response = await orderService.show(id)
                this.order = response.data?.data ?? null
            });
        },
        async updateOrder(id, payload) {
            return await handleCommonActions(async () => {
                await orderService.update(id, payload)
                this.fetchOrders()
            });
        },
        async deleteOrder(id, type = 1) {
            return await handleCommonActions(async () => {
                await orderService.delete(id, type)
                this.fetchOrders()
            });
        },
        async restoreOrder(id) {
            return await handleCommonActions(async () => {
                await orderService.restore(id)
                this.fetchOrders()
            });
        },
    }
});