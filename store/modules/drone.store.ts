import { defineStore } from 'pinia'
import {droneService} from '~/services'
import { handleCommonActions } from '~/utils'
import { usePaginationStore } from '~/store'

export const useDroneStore = defineStore({
    id: 'drone',
    state: () => ({
        searchParam: {
            query: null
        },
        drones: [],
        drone: null,
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
        async fetchDrones(payload = {}) {
            const paginationStore = usePaginationStore();

            return await handleCommonActions(async () => {
                const response = await droneService.get(this.getPayload(payload));
                this.drones = response.data?.data ?? [];
                paginationStore.setPaginationData(response.data?.meta ?? {});
            });
        },
        async storeDrone(payload) {
            return await handleCommonActions(async () => {
                await droneService.store(payload);
                this.fetchDrones();
            });
        },
        async getDrone(id) {
            return await handleCommonActions(async () => {
                const response = await droneService.show(id);
                this.drone = response.data?.data ?? null;
            });
        },
        async updateDrone(id, payload) {
            return await handleCommonActions(async () => {
                await droneService.update(id, payload);
                this.fetchDrones();
            });
        },
        async deleteDrone(id, type = 1) {
            return await handleCommonActions(async () => {
                await droneService.delete(id, type);
                this.fetchDrones();
            });
        },
        async restoreDrone(id) {
            return await handleCommonActions(async () => {
                await droneService.restore(id);
                this.fetchDrones();
            });
        },
    }
});