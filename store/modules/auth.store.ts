import { defineStore } from 'pinia'
import { authService } from '~/services'
import { handleCommonActions } from '~/utils'

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
        async getAuthUser(){
            const response = await authService.authorize();
            this.user = response.data?.data ?? null;
            this.type = this.user?.type ?? null;
        },
        redirectAfterLoginBasedOnType(){
            switch(this.type){
                case 1:
                    return this.router.push({name: "dashboard"});
                    break;
                case 2:
                    return this.router.push({name: "prep-sheet.index"});
                    break;
                default:
                    return this.router.push({name: 'auth.login'});
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