export default defineNuxtRouteMiddleware((to) => {
    const { user, isAuthenticated } = useAuth()

    if (to.path === '/login' && isAuthenticated.value) {
        return navigateTo('/dashboard')
    }

    if (to.path.startsWith('/dashboard') && !isAuthenticated.value) {
        return navigateTo('/login')
    }

    if (to.path === '/dashboard' && isAuthenticated.value && user.value) {
        if (user.value.type === 'admin') {
            return navigateTo('/dashboard/admin')
        } else if (user.value.type === 'farmer') {
            return navigateTo('/dashboard/farmer')
        }
    }

    if (to.path.startsWith('/dashboard/admin')) {
        if (!user.value || user.value.type !== 'admin') {
            return navigateTo('/dashboard')
        }
    }

    if (to.path.startsWith('/dashboard/farmer')) {
        if (!user.value || user.value.type !== 'farmer') {
            return navigateTo('/dashboard')
        }
    }
})