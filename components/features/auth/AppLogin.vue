<script setup lang="ts">
    const {login} = useAuth()
    const router = useRouter()

    const loginAs = async (userType: 'admin' | 'farmer') => {
        await login(userType)
        router.push('/dashboard')
    }
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 class="mb-8">Login</h1>
        <div class="space-y-4">
            <button
                @click="loginAs('admin')"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
                Login as Admin
            </button>
            <button
                @click="loginAs('farmer')"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
            >
                Login as Farmer
            </button>
        </div>
    </div>
</template>