import {defineStore} from 'pinia'
import {authService} from '~/services'
import {handleCommonActions} from '~/utils'
import {useRouter} from 'nuxt/app'
import { useCookie } from 'nuxt/app'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        isAuthAlertModalOpen: false,
        isAuthCalled: false,
        type: null,
        user: useCookie('user') ?? null,
    }),
    actions: {
        async register(payload) {
            return await handleCommonActions(async () => {
                return await authService.register(payload)
            })
        },
        async login(payload) {
            return await handleCommonActions(async () => {
                // await authService.getCookieCredential()
                const response = await authService.login(payload)

                if (response?.data?.data?.token) {
                    localStorage.setItem('auth_token', response?.data?.data?.token)
                    await this.authorize()
                }

                await this.redirectAfterLoginBasedOnType()
            })
        },
        async authorize() {
            if (!this.isAuthCalled) {
                return await handleCommonActions(async () => {
                    await this.getAuthUser()
                    this.isAuthCalled = true
                })
            }
        },
        async getAuthUser() {
            const token = localStorage.getItem('auth_token')

            if (token) {
                const response = await authService.authorize(token)
                this.user = response?.data?.data ?? null
                this.type = this.user?.userRoles[0] ?? null

                // Set user in browser cookie
                const userCookie = useCookie('user', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
                userCookie.value = JSON.stringify(response?.data?.data)
            }
        },
        async logout() {
            const router = useRouter()
            const token = localStorage.getItem('auth_token')

            return await handleCommonActions(async () => {
                // await authService.logout(token)
                this.$reset()
                await router.push('/login')

                // Clear auth token from local storage
                localStorage.removeItem('auth_token')

                // Clear user from cookie
                const userCookie = useCookie('user')
                userCookie.value = null
            })
        },
        async forgotPassword(payload) {
            return await handleCommonActions(async () => {
                await authService.forgotPassword(payload)
            })
        },
        async resetPassword(payload) {
            return await handleCommonActions(async () => {
                await authService.resetPassword(payload)
            })
        },
        redirectAfterLoginBasedOnType() {
            const router = useRouter()

            switch (this.type) {
                case 'vendor':
                    return router.push('/')
                    break
                case 'farmer':
                    return router.push('/')
                    break
                default:
                    return router.push('/')
                    break
            }
        },
    }
})