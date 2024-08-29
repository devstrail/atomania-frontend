<script setup lang="ts">
    import AppLogo from '~/components/shared/AppLogo.vue'
</script>

<template>
    <div class="min-h-screen grid laptop:grid-cols-2 items-stretch prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop">
        <div class="grid place-items-center bg-white">
            <div class="max-w-[360px]">
                <AppLogo class="mb-2"/>
                <h3 class="mb-1">Welcome back</h3>
                <p class="mb-8">Welcome back! Please enter your details.</p>
                <slot/>
            </div>
        </div>
        <div class="hidden laptop:block bg-[url('/images/backgrounds/sign-in-bg.jfif')] bg-cover bg-center"/>
    </div>
</template>