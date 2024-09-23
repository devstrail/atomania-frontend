import {defineStore} from 'pinia'
import {authService} from '~/services'
import {handleCommonActions} from '~/utils'
import { useRouter } from 'nuxt/app'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthAlertModalOpen: false,
        isAuthCalled: false,
        type: null,
        user: null,
    }),
    actions: {
        async login(payload) {
            return await handleCommonActions(async () => {
                // await authService.getCookieCredential();
                const response = await authService.login(payload);
                if (response?.data?.data?.token) {
                    localStorage.setItem('auth_token', response?.data?.data?.token);
                    await this.authorize();
                }
                this.redirectAfterLoginBasedOnType();
            });
        },
        async register(payload) {
            return await handleCommonActions(async () => {
                await authService.register(payload);
            });
        },
        async authorize() {
            if (!this.isAuthCalled) {
                return await handleCommonActions(async () => {
                    await this.getAuthUser();
                    this.isAuthCalled = true;
                });
            }
        },
        async getAuthUser() {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('auth_token');
            if (token) {
                // Use the token in the authorization request
                const response = await authService.authorize(token);
                this.user = response.data?.data ?? null;
                this.type = this.user?.type ?? null;
            }
        },
        redirectAfterLoginBasedOnType() {
            const router = useRouter()
            switch (this.type) {
                case 1:
                    return router.push('/dashboard')
                    break
                case 2:
                    return router.push('/')
                    break
                default:
                    return router.push('/')
                    break
            }
        },
        async logout() {
            const router = useRouter()
            router.push('/login');
            this.type = null;
            return
            return await handleCommonActions(async () => {
                await authService.logout();
                this.$reset();
                this.router.push({name: 'auth.login'});
            });
        },
        async forgotPassword(payload) {
            return await handleCommonActions(async () => {
                await authService.forgotPassword(payload);
            });
        },
        async resetPassword(payload) {
            return await handleCommonActions(async () => {
                await authService.resetPassword(payload);
            });
        },
    }
});