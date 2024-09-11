<script setup lang="ts">
    import {ref, onMounted, onUnmounted} from 'vue'
    import {navItems} from '~/config'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    // Data
    let lastScrollTop = 0
    const scrollThreshold = 50
    const isHeaderVisible = ref(true)
    const isScrollingUp = ref(false)
    const isMobileMenuOpen = ref(false)

    // Methods
    const handleScroll = () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop

        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            isHeaderVisible.value = false
            isScrollingUp.value = false
        } else if (currentScrollTop < lastScrollTop) {
            isHeaderVisible.value = true
            isScrollingUp.value = true
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
    }

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const toggleBodyScroll = (disable: boolean) => {
        if (disable) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }

    // Watchers
    watch(isMobileMenuOpen, (newValue) => {
        toggleBodyScroll(newValue)
    })

    // Lifecycle hooks
    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        toggleBodyScroll(false)
    })
</script>

<template>
    <header
        :class="{
          'fixed top-0 left-0 right-0 z-50 transform transition-transform duration-500': true,
          '-translate-y-full': !isHeaderVisible,
          'translate-y-0': isHeaderVisible && isScrollingUp
        }"
        class="border-b border-gray-100 bg-white"
    >
        <div class="container">
            <div
                class="h-[72px] laptop:h-[96px] flex laptop:grid laptop:grid-cols-[245px_auto_245px] items-center justify-between gap-4">
                <NuxtLink to="/">
                    <AppLogo/>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden laptop:block">
                    <ul class="flex items-center justify-center gap-2">
                        <li v-for="(navItem, navItemIndex) in navItems" :key="navItemIndex">
                            <NuxtLink
                                :to="navItem?.url"
                                class="p-2 text-gray-500 hover:text-gray-600 font-medium text-b3 transition"
                            >
                                {{ navItem?.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <!-- Mobile Menu Toggle Button -->
                <button
                    class="laptop:hidden flex flex-col justify-around w-6 h-5 bg-transparent border-none cursor-pointer p-0 z-10 focus:outline-none"
                    @click="toggleMobileMenu"
                >
                    <span class="sr-only">Toggle menu</span>
                    <span
                        class="w-6 h-[3px] bg-gray-700 rounded-full transform transition-all duration-300 ease-in-out"
                        :class="{'rotate-45 translate-y-[6px]': isMobileMenuOpen}"
                    />
                    <span
                        class="w-6 h-[3px] bg-gray-700 rounded-full transform transition-all duration-300 ease-in-out"
                        :class="{'opacity-0 translate-x-5': isMobileMenuOpen}"
                    />
                    <span
                        class="w-6 h-[3px] bg-gray-700 rounded-full transform transition-all duration-300 ease-in-out"
                        :class="{'-rotate-45 -translate-y-[7px]': isMobileMenuOpen}"
                    />
                </button>

                <ul class="hidden laptop:flex items-center justify-center gap-3">
                    <li>
                        <AppButton
                            url="/login"
                            button-color="secondary"
                            class="border-transparent"
                        >
                            Sign in
                        </AppButton>
                    </li>
                    <li>
                        <AppButton
                            url="/login"
                        >
                            Sign up
                        </AppButton>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <transition name="slide-scale">
            <nav
                v-if="isMobileMenuOpen"
                class="flex flex-col justify-between laptop:hidden h-[calc(100vh-72px)] bg-white"
            >
                <ul class="container flex flex-col gap-2 py-4">
                    <li v-for="(navItem, navItemIndex) in navItems" :key="navItemIndex"
                        :style="{ animationDelay: `${navItemIndex * 0.1}s` }"
                        class="nav-item">
                        <NuxtLink
                            :to="navItem?.url"
                            class="block py-3 text-gray-700 hover:text-gray-900 font-medium text-b3 transition"
                            @click="isMobileMenuOpen = false"
                        >
                            {{ navItem?.title }}
                        </NuxtLink>
                    </li>
                </ul>
                <ul class="container grid grid-cols-2 gap-3 py-4 mt-auto">
                    <li class="nav-item" style="animation-delay: 0.6s;">
                        <AppButton
                            url="/login"
                            button-color="secondary"
                            full-width
                        >
                            Sign in
                        </AppButton>
                    </li>
                    <li class="nav-item" style="animation-delay: 0.6s;">
                        <AppButton
                            url="/login"
                            full-width
                        >
                            Sign up
                        </AppButton>
                    </li>
                </ul>
            </nav>
        </transition>
    </header>
</template>

<style scoped>
    .slide-scale-enter-active,
    .slide-scale-leave-active {
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        transform-origin: top center;
    }

    .slide-scale-enter-from,
    .slide-scale-leave-to {
        transform: scaleY(0) translateY(-10%);
        opacity: 0;
    }

    .nav-item {
        opacity: 0;
        transform: translateY(-20px);
        animation: fadeInDown 0.5s forwards;
    }

    @keyframes fadeInDown {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>