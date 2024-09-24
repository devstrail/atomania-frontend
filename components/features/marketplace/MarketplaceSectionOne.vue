<script setup lang="ts">
    import TabOne from '~/components/features/marketplace/tabs/TabOne.vue'
    import TabTwo from '~/components/features/marketplace/tabs/TabTwo.vue'
    import TabThree from '~/components/features/marketplace/tabs/TabThree.vue'
    import TabFour from '~/components/features/marketplace/tabs/TabFour.vue'

    const route = useRoute()
    const router = useRouter()
    const tabs = [
        {
            id: 1,
            title: 'Machines',
        },
        {
            id: 2,
            title: 'Farming Experts',
        },
        {
            id: 3,
            title: 'Drones',
        },
        {
            id: 4,
            title: 'Saved machine',
        }
    ]
    const activeTab = ref(Number(route.query.tab) || 1)

    const handleTabChange = (index: number) => {
        activeTab.value = index + 1
        router.push({ query: { tab: activeTab.value } })
    }

    const getActiveComponent = computed(() => {
        switch (activeTab.value) {
            case 1: return TabOne
            case 2: return TabTwo
            case 3: return TabThree
            case 4: return TabFour
            default: return TabOne
        }
    })

    const switchTab = (tabId: number) => {
        activeTab.value = tabId
    }

    watch(() => route.query, (newQuery, oldQuery) => {
        if (newQuery.tab) {
            activeTab.value = Number(newQuery.tab)
        }
    });
</script>

<template>
    <section class="py-8 laptop:py-10 bg-white">
        <div class="container">
            <div class="mb-10 laptop:border-b border-gray-200">
                <ul class="flex gap-4 flex-col laptop:flex-row">
                    <li v-for="(tab, tabIndex) in tabs">
                        <button
                            type="button"
                            :class="[
                                `relative px-3 laptop:px-1 laptop:pb-[18px] font-medium before:w-[2px] laptop:before:w-full before:h-full laptop:before:h-[2px] before:absolute before:left-0 before:bottom-0 before:bg-royal-flycatcher-crest-600 before:transition-all`,
                                activeTab === tabIndex + 1 ? 'text-royal-flycatcher-crest-600 before:opacity-1 before:visible' : 'text-gray-500 before:opacity-0 before:invisible',
                            ]"
                            @click="handleTabChange(tabIndex)"
                        >
                            {{ tab.title }}
                        </button>
                    </li>
                </ul>
            </div>
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform translate-y-5 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform translate-y-5 opacity-0"
                mode="out-in"
            >
                <component
                    :is="getActiveComponent"
                    :key="activeTab"
                    @switchTab="switchTab"
                />
            </transition>
        </div>
    </section>
</template>