import { defineStore } from 'pinia';
import {notificationService} from '@/services/index.js';
import {handleCommonActions} from '@/utils/index.js';

export const useNotificationStore = defineStore({
    id: 'notification',
    state: () => ({
        adminNotifications: [],
        unseenAdminNotificationCount: 0
    }),
    actions: {
        async fetchAdminNotifications() {
            return await handleCommonActions(async () => {
                const response = await notificationService.getAdminNotifications();
                this.adminNotifications = response.data?.data ?? [];
                this.unseenAdminNotificationCount = response.data?.unseen_notification_count ?? 0;
            });
        },
        async seenAdminNotification(id) {
            return await handleCommonActions(async () => {
                await notificationService.seenAdminNotification(id);
            });
        },
    }
});