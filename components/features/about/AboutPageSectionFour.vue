<script setup lang="ts">
    import {teams} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16 max-w-[768px] mx-auto"
                title="Fă cunoștință cu echipa noastră"
                description="Echipa noastră este compusă din profesioniști pasionați, cu o vastă experiență în agricultură, tehnologie și dezvoltare de afaceri. Iată mai jos principalii membrii ai Automania"
                align="center"
            />
            <div class="max-w-[904px] mx-auto grid laptop:grid-cols-3 gap-8">
                <div
                    v-for="(team, teamIndex) in teams"
                    class="flex flex-col items-center justify-center gap-5"
                    v-motion="{
                      initial: {
                        y: 30,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500 + (teamIndex * 50)
                        },
                      }
                    }"
                >
                    <NuxtImg width="80" height="80" :src="team.avatar" :alt="team.name" />
                    <div class="text-center">
                        <p class="text-gray-900 font-medium text-b2">{{ team?.name }}</p>
                        <p class="text-primary-700">{{ team?.designation }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>