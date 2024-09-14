<script setup lang="ts">
    import AppLogoIcon from '~/components/shared/AppLogoIcon.vue';
</script>

<template>
    <div class="min-h-screen grid laptop:grid-cols-2 items-stretch prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop">
        <div class="grid place-items-center bg-white">
            <div class="w-full max-w-[360px]">
                <app-logo-icon class="mb-2 mx-auto"/>
                <transition name="fade" mode="out-in">
                    <slot/>
                </transition>
            </div>
        </div>
        <div class="hidden laptop:block bg-[url('/images/backgrounds/sign-in-bg.jpg')] bg-cover bg-center"/>
    </div>
</template>