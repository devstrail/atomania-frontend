<script setup lang="ts">
    import {teams} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16 max-w-[768px]"
                title="Meet our team"
                description="Our team is composed of passionate professionals with extensive experience in agriculture, technology, and business development. Key members include"
            />
            <div class="grid laptop:grid-cols-3 gap-8">
                <div
                    v-for="(team, teamIndex) in teams"
                    class="flex flex-col items-center justify-center gap-5"
                >
                    <NuxtImg width="80" height="80" :src="team.avatar" :alt="team.name" />
                    <div>
                        <p class="text-gray-900 font-medium text-b2">{{ team.name }}</p>
                        <p class="text-primary-700">{{ team.designation }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>