<script setup lang="ts">
    import AppLogoIcon from "~/components/shared/AppLogoIcon.vue";
</script>

<template>
    <div class="min-h-screen grid laptop:grid-cols-2 items-stretch prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop">
        <div class="grid place-items-center bg-white">
            <div class="max-w-[360px]">
                <app-logo-icon class="mb-2 mx-auto"/>
                <h3 class="mb-1 text-center">Welcome back</h3>
                <p class="mb-8 text-gray-500 text-center">Welcome back! Please enter your details.</p>
                <slot/>
            </div>
        </div>
        <div class="hidden laptop:block bg-[url('/images/backgrounds/sign-in-bg.jpg')] bg-cover bg-center"/>
    </div>
</template>