export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie('user').value

    if (!user) {
        return navigateTo('/')
    }
})
