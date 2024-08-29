import { apiClient } from '~/services/index'

export const cacheService = {
    async getItems() {
        return apiClient.get('/cache/items')
    },
    async getStores() {
        return apiClient.get('/cache/stores')
    },
    async getWorksheetItems(worksheetType) {
        return apiClient.get(`/cache/worksheets/${worksheetType}/items`)
    },
};