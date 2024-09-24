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
                paginationStore.setPaginationData(response.data?.meta ?? {})

                // Extract filters data (address, type, farmType, farmActivity)
                const addresses = new Set()
                const types = new Set()
                const farmTypes = new Set()
                const farmActivities = new Set()

                this.machines.forEach(machine => {
                    if (machine.address) addresses.add(machine.address)
                    if (machine.type) types.add(machine.type)
                    if (machine.farmType) farmTypes.add(machine.farmType)
                    if (machine.farmActivity) farmActivities.add(machine.farmActivity)
                })

                this.filters = {
                    address: Array.from(addresses),
                    type: Array.from(types),
                    farmType: Array.from(farmTypes),
                    farmActivity: Array.from(farmActivities),
                }
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
    }
});