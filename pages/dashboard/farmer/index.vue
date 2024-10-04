<script setup lang="ts">
    definePageMeta({
        layout: 'farmer'
    })
    const { logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Farmer Dashboard</h1>
        <p>Welcome, Farmer!</p>
        <button @click="handleLogout" class="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Deconectare
        </button>
    </div>
</template>

