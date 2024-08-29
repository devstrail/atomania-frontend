import { defineStore } from 'pinia'
import { profileService } from '~/services'
import { handleCommonActions } from '~/utils'
import { useAuthStore } from '~/store'

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        user: null,
    }),
    actions: {
        async fetchProfile() {
            const authStore = useAuthStore();
            
            return await handleCommonActions(async () => {
                const response = await profileService.get();
                this.user = response.data?.data ?? null;
                authStore.user.avatar = this.user?.avatar;
            });
        },
        async updatePhone(payload) {
            return await handleCommonActions(async () => {
                await profileService.updatePhone(payload);
                this.fetchProfile();
            });
        },
        async updateAvatar(payload) {
            return await handleCommonActions(async () => {
                console.log(payload)
                await profileService.updateAvatar(payload);
                this.fetchProfile();
            });
        },
    }
});