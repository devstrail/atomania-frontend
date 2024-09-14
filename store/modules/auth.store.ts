import {defineStore} from 'pinia'
import {authService} from '~/services'
import {handleCommonActions} from '~/utils'
import { useRouter } from 'nuxt/app'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthCalled: false,
        type: null,
        user: null,
    }),
    actions: {
        async login(payload) {
            return await handleCommonActions(async () => {
                await authService.getCookieCredential();
                await authService.login(payload);
                await this.authorize();
                this.redirectAfterLoginBasedOnType();
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
            // this.type = 2;
            const response = await authService.authorize();
            console.log(response)
            this.user = response.data?.data ?? null;
            this.type = this.user?.type ?? null;
            console.log(this.type)
        },
        redirectAfterLoginBasedOnType() {
            const router = useRouter()
            console.log(this.type)
            switch (this.type) {
                case 1:
                    return router.push('/dashboard');
                    break;
                case 2:
                    return router.push('/');
                    break;
                default:
                    return router.push('/');
                    break;
            }
        },
        async logout() {
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