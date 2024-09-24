import {defineStore} from 'pinia'
import {profileService} from '~/services'
import {handleCommonActions} from '~/utils'
import {useAuthStore} from '~/store'
import {useCookie} from 'nuxt/app'

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
            });
        },
        async updateAvatar(payload) {
            return await handleCommonActions(async () => {
                return await profileService.updateAvatar(payload);
                this.fetchProfile();
            });
        },
        async updateProfileInfo(payload) {
            return await handleCommonActions(async () => {
                await profileService.updatePhone(payload);
                this.fetchProfile();
            });
        },
    }
});