<script setup lang="ts">
    import {services} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppIcon from "~/components/shared/AppIcon.vue";
</script>

<template>
    <section id="serviceSection" class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <div class="max-w-[780px]">
                <app-breadcrumb
                    class="mb-8 laptop:mb-16"
                    title="Ce oferim..."
                    description="Aș șterge complet fraza asta și aș adauga tot ca un punct urmatoarea: Platformă ușor accesibilă (titlu). Text: Platforma noastră oferă acces la cerere la echipamente, operatori calificați și instrumente avansate, făcând agricultura mai eficientă și mai rentabilă."
                />
            </div>
            <div class="grid laptop:grid-cols-3 gap-x-8 gap-y-8 laptop:gap-y-16">
                <div v-for="(service, serviceIndex) in services">
                    <app-icon class="mb-5" :icon="service?.icon"/>
                    <p
                        class="mb-2 text-gray-900 font-medium text-b1"
                        v-motion="{
                          initial: {
                            y: 10,
                            opacity: 0
                          },
                          visibleOnce: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 500
                            },
                          }
                        }"
                    >
                        {{ service?.title }}
                    </p>
                    <p
                        class="text-gray-500 text-b3"
                        v-motion="{
                          initial: {
                            y: 10,
                            opacity: 0
                          },
                          visibleOnce: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 500,
                                delay: 550
                            },
                          }
                        }"
                    >
                        {{ service?.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>