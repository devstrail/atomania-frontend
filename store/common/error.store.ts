import { defineStore } from 'pinia'
import { useRouter } from '#app'
import { showWarningMessage } from '~/utils'
import { useAuthStore } from '~/store'

export const useErrorStore = defineStore('error', {
    state: () => ({
        error: {},
        showAbleErrorCodes: [403, 404, 500],
        errorCode: null,
    }),
    getters: {
        formErrors: (state) => {
            const errorBag = [];

            if (Object.keys(state.error).length === 0) return errorBag;
            if (state.error && state.error.response && state.error.response.status === 422) {
                for (const key in state.error.response.data.errors) {
                    errorBag[key] = state.error.response.data.errors[key][0];
                }
            }
            return errorBag;
        },
        isShowAbleErrorCode: (state) => {
            return state.showableErrorCodes.includes(state.errorCode);
        },
        errorMessage: (state) => {
            return state.error?.response?.data?.message ?? null;
        },
    },
    actions: {
        setError(error) {
            this.error = error;
            if (error?.code == 'ERR_NETWORK') {
                console.log('Connection is not ok');
            }

            this.errorCode = error?.response?.status != undefined ? error?.response?.status : null;
            this.handleError();
        },
        handleError() {
            const router = useRouter();
            if (this.errorCode == 401) {
                setTimeout(() => {
                    const currentRoute = router.currentRoute.value;
                    if (currentRoute.name && currentRoute.name != 'auth-login') {
                        const query = { ...currentRoute.query, redirectFrom: currentRoute.name };
                        useAuthStore().resetAuth();

                        router.push({
                            name: 'auth-login',
                            query: query,
                        });
                    } else {
                        router.push({ name: 'auth-login' });
                    }
                }, 200);
            }
            if (this.errorCode == 406 || this.errorCode == 500) {
                showWarningMessage({ title: this.errorMessage, text: '' });
            }
        },
        setErrorCode(code) {
            this.errorCode = code;
        },
    },
});