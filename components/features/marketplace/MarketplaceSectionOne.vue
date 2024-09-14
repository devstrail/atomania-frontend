<script setup lang="ts">
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
    const activeTab = ref(1)

    const handleTabChange = (index) => {
        activeTab.value = index + 1;
    }
</script>

<template>
    <section class="py-8 laptop:py-10 bg-white">
        <div class="container">
            <div class="border-b border-gray-200">
                <ul class="flex gap-4 flex-col laptop:flex-row">
                    <li v-for="(tab, tabIndex) in tabs">
                        <button
                            type="button"
                            :class="[
                                `relative px-1 laptop:pb-[18px] font-medium before:w-full before:h-[2px] before:absolute before:left-0 before:bottom-0 before:bg-royal-flycatcher-crest-600 before:transition-all`,
                                activeTab === tabIndex + 1 ? 'text-royal-flycatcher-crest-600 before:opacity-1 before:visible' : 'text-gray-500 before:opacity-0 before:invisible',
                            ]"
                            @click="handleTabChange(tabIndex)"
                        >
                            {{ tab.title }}
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    </section>
</template>