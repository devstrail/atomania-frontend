import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import { useRouter } from '#app'

export const pinia = createPinia()

pinia.use(({ store }) => {
    const router = useRouter()
    store.router = markRaw(router)
})

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(pinia)
})