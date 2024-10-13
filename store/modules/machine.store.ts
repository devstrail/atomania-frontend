import { defineStore } from 'pinia'
import {machineService} from '~/services'
import { handleCommonActions } from '~/utils'
import { usePaginationStore } from '~/store'

export const useMachineStore = defineStore({
    id: 'machine',
    state: () => ({
        searchParam: {
            query: null
        },
        filters: {},
        machines: [],
        machine: null,
        isOrderMachineModalOpen: false,
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
        async fetchMachines(payload = {}) {
            const paginationStore = usePaginationStore()

            return await handleCommonActions(async () => {
                const response = await machineService.get(this.getPayload(payload))
                this.machines = response.data?.data?.data ?? []

                if (response.data?.data) {
                    paginationStore.updatePagination({
                        current_page: response.data.data.current_page,
                        last_page: response.data.data.last_page,
                        total: response.data.data.total,
                        per_page: response.data.data.per_page
                    })
                }

                return response.data
            });
        },
        async getMachine(id) {
            return await handleCommonActions(async () => {
                const response = await machineService.show(id)
                this.machine = response.data?.data ?? null
            });
        },
        async storeMachine(payload) {
            return await handleCommonActions(async () => {
                await machineService.store(payload);
                this.fetchMachines();
            });
        },
        async updateMachine(id, payload) {
            return await handleCommonActions(async () => {
                await machineService.update(id, payload)
                this.fetchMachines()
            });
        },
        async deleteMachine(id, type = 1) {
            return await handleCommonActions(async () => {
                await machineService.delete(id, type)
                this.fetchMachines()
            });
        },
        async restoreMachine(id) {
            return await handleCommonActions(async () => {
                await machineService.restore(id)
                this.fetchMachines()
            });
        },
        async saveMachine(payload) {
            return await handleCommonActions(async () => {
                return await machineService.save(payload)
            });
        },
        async fetchFilters() {
            return await handleCommonActions(async () => {
                const response = await machineService.filters()
                this.filters = response.data?.data ?? []
            });
        }
    }
});