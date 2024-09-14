import { apiClient } from '@/services/index.js';

export const notificationService = {
    async getAdminNotifications() {
        return apiClient.get("/admin/web-notifications");
    },
    async seenAdminNotification(id) {
        return apiClient.post(`/admin/web-notifications/${id}/seen`);
    },
};