<script setup lang="ts">
    import {ref, onMounted, onUnmounted} from 'vue'
    import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/vue'
    import {useAuthStore, useNotificationStore} from '~/store'
    import {navItems, navItemsFarmer} from '~/config'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    /* -- Define Utilities -- */
    const router = useRouter()

    // Define stores
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    // Data
    let lastScrollTop = 0
    const scrollThreshold = 50
    const isHeaderVisible = ref(true)
    const isScrollingUp = ref(false)
    const isMobileMenuOpen = ref(false)

    // Computed
    const menuItems = computed(() => {
        if (authStore.type === 2) {
            return navItemsFarmer
        } else {
            return navItems
        }
    })

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

    const navigateToSection = (sectionId) => {
        const currentRoute = router.currentRoute.value
        if (currentRoute.path === '/') {
            // If already on the homepage, simply scroll to the section
            document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' })
        } else {
            // Navigate to the home page with the section ID
            router.push({ path: '/', hash: sectionId })
        }
    }

    /* -- Handle Notification -- */
    const fetchNotifications = async () => {
        if (authStore.type === 2) {
            await notificationStore.fetchAdminNotifications()
        }
    }
    const handleSeenAdminNotification = async (id) => {
        if (!id) return;
        if (authStore.type === 2) {
            await notificationStore.seenAdminNotification(id)
        }
        await fetchNotifications()
    }
    onMounted(() => {
        fetchNotifications();
    })

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
                        <li v-for="(navItem, navItemIndex) in menuItems" :key="navItemIndex">
                            <NuxtLink
                                v-if="navItem?.url"
                                :to="navItem?.url"
                                class="p-2 text-gray-500 hover:text-gray-600 font-medium text-b3 transition"
                            >
                                {{ navItem?.title }}
                            </NuxtLink>
                            <a
                                v-else
                                @click.prevent="navigateToSection(navItem?.sectionId)"
                                class="p-2 text-gray-500 hover:text-gray-600 font-medium cursor-pointer text-b3 transition"
                            >
                                {{ navItem?.title }}
                            </a>
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

                <ul class="hidden laptop:flex items-center justify-center laptop:justify-end gap-3">
                    <template v-if="authStore.type === 2">
                        <li>
                            <Menu as="div" class="relative inline-block">
                                <div>
                                    <MenuButton
                                        class="relative size-10 flex gap-2 items-center justify-center p-1 font-semibold text-b2 rounded transition-all hover:bg-primary-50"
                                    >
                                        <i class="dt-icon-bell-01"/>
                                        <div
                                            class="absolute -top-1 -right-1 size-[16px] rounded-full flex items-center justify-center bg-warning-200 text-[9px]">
                                            {{ notificationStore.unseenAdminNotificationCount }}
                                        </div>
                                    </MenuButton>
                                </div>
                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                        class="w-[300px] max-h-[500px] overflow-auto custom-scrollbar-card absolute right-0 flex flex-col gap-3 p-5 mt-1 origin-top-right rounded-xl bg-white shadow-lg"
                                    >
                                        <template
                                            v-if="notificationStore.adminNotifications?.length"
                                            v-for="(notification, notificationIndex) in notificationStore.adminNotifications"
                                        >
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    type="button"
                                                    :class="[
                                                        `flex gap-x-[10px] pb-3 border-b border-gray-200 group`,
                                                        {'opacity-80': notification?.is_seen}
                                                    ]"
                                                    @click="handleSeenAdminNotification(notification?.id)"
                                                >
                                                    <span class="flex items-center gap-1 text-left">
                                                        <span class="text-b5 transition group-hover:text-primary-600">
                                                            {{ notification?.message }}
                                                        </span>
                                                    </span>
                                                    <span
                                                        v-if="!notification?.is_seen"
                                                        class="shrink-0 size-[10px] rounded-full bg-primary-400 self-center"
                                                    />
                                                </button>
                                            </MenuItem>
                                        </template>
                                        <template v-else>
                                            <p class="text-b4 text-center">
                                                You have no new notifications at the moment.
                                            </p>
                                        </template>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </li>
                        <li>
                            <Menu as="div" class="relative inline-block">
                                <div>
                                    <MenuButton
                                        class="flex gap-2 items-center justify-center"
                                    >
                                        <img
                                            width="32"
                                            height="32"
                                            :src="authStore?.user?.avatar ? authStore?.user?.avatar : '/images/avatar-placeholder.svg'"
                                            :alt="authStore?.user?.name"
                                            class="rounded-full"
                                        />
                                        <div>
                                            <p class="text-gray-700 text-b4">{{ authStore?.user?.first_name }}</p>
                                            <p class="text-gray-500 text-b5">+4089823279</p>
                                        </div>
                                        <i class="dt-icon-chevron-down text-b5"/>
                                    </MenuButton>
                                </div>
                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                        class="w-[220px] absolute right-0 overflow-hidden flex flex-col mt-1 origin-top-right rounded-xl bg-white shadow-lg"
                                    >
                                        <div class="flex gap-3 items-center px-4 py-3 border-b border-gray-200">
                                            <img
                                                width="32"
                                                height="32"
                                                :src="authStore?.user?.avatar ? authStore?.user?.avatar : '/images/avatar-placeholder.svg'"
                                                :alt="authStore?.user?.name"
                                                class="rounded-full"
                                            />
                                            <div>
                                                <p class="text-gray-700 text-b4">{{ authStore?.user?.first_name }}</p>
                                                <p class="text-gray-500 text-b5">+4089823279</p>
                                            </div>
                                        </div>
                                        <div class="flex flex-col py-1 border-b border-gray-200">
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    type="button"
                                                    class="flex items-center gap-2 px-4 py-2 text-gray-700 text-b4 hover:bg-gray-50 transition-all"
                                                    @click="router.push('/profile')"
                                                >
                                                    <i class="dt-icon-user-01"/> My Profile
                                                </button>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    type="button"
                                                    class="flex items-center gap-2 px-4 py-2 text-gray-700 text-b4 hover:bg-gray-50 transition-all"
                                                    @click="router.push('/orders')"
                                                >
                                                    <i class="dt-icon-archive"/> My Orders
                                                </button>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                                <button
                                                    type="button"
                                                    class="flex items-center gap-2 px-4 py-2 text-gray-700 text-b4 hover:bg-gray-50 transition-all"
                                                    @click="router.push({ path: '/marketplace', query: { tab: 4 } })"
                                                >
                                                    <i class="dt-icon-bookmark-check"/> Saved Machine
                                                </button>
                                            </MenuItem>
                                        </div>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                type="button"
                                                class="flex items-center gap-2 px-4 py-2 text-error-500 text-b4 hover:bg-gray-50 transition-all"
                                                @click="router.push('/login')"
                                            >
                                                <i class="dt-icon-log-out-01"/> Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <AppButton
                                url="/login"
                                button-color="secondary"
                                class="border-transparent"
                            >
                                Log in
                            </AppButton>
                        </li>
                        <li>
                            <AppButton
                                url="/sign-up"
                            >
                                Sign up
                            </AppButton>
                        </li>
                    </template>
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