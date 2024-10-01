import {defineStore} from 'pinia'
import {profileService} from '~/services'
import {handleCommonActions} from '~/utils'
import {useAuthStore} from '~/store'
import {useCookie} from 'nuxt/app'

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        loading: false,
        user: useCookie('user') ?? null,
    }),
    actions: {
        async fetchProfile() {
            const authStore = useAuthStore();

            return await handleCommonActions(async () => {
                const response = await profileService.get()
                this.user = response.data?.data ?? null
                authStore.user = response.data?.data ?? null

                // Update the user data in the browser cookie
                const userCookie = useCookie('user', { maxAge: 60 * 60 * 24 * 7 }); // 7 days
                userCookie.value = JSON.stringify(this.user)
            });
        },
        async updateAvatar(payload) {
            return await handleCommonActions(async () => {
                this.loading = true
                const response = await profileService.updateAvatar(payload)
                await this.fetchProfile()
                this.loading = false
                return response
            });
        },
        async updateProfileInfo(payload) {
            return await handleCommonActions(async () => {
                this.loading = true
                const response = await profileService.update(payload, this.user.id)
                await this.fetchProfile()
                this.loading = false
                return response
            });
        },
    }
});