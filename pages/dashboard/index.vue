<script setup lang="ts">
    const { user } = useAuth()
    const router = useRouter()

    onMounted(() => {
        if (user.value) {
            if (user.value.type === 'admin') {
                router.push('/dashboard/admin')
            } else if (user.value.type === 'farmer') {
                router.push('/dashboard/farmer')
            }
        } else {
            router.push('/login')
        }
    })
</script>

<template>
    <div>Redirecting to appropriate dashboard...</div>
</template>