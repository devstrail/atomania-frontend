<script setup lang="ts">
    import {navItems} from '~/config'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppButton from "~/components/shared/AppButton.vue";
</script>

<template>
    <header
        class="border-b border-gray-100 bg-white"
        v-motion="{
          initial: {
            y: -80,
            opacity: 0
          },
          enter: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 500
            },
          }
        }"
    >
        <div class="container">
            <div class="laptop:h-[96px] grid laptop:grid-cols-[245px_auto_245px] items-center gap-4">
                <NuxtLink to="/">
                    <AppLogo/>
                </NuxtLink>
                <nav>
                    <ul class="flex items-center justify-center gap-2">
                        <li v-for="(navItem, navItemIndex) in navItems">
                            <NuxtLink
                                :to="navItem?.url"
                                class="p-2 text-gray-500 hover:text-gray-600 font-medium text-b3 transition"
                            >
                                {{ navItem?.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <ul class="flex items-center justify-center gap-3">
                    <li>
                        <AppButton url="/login" button-color="secondary" class="border-transparent">
                            Sign in
                        </AppButton>
                    </li>
                    <li>
                        <AppButton url="/login">
                            Sign up
                        </AppButton>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>