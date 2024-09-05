<script setup lang="ts">
    import {services} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="laptop:py-[96px] bg-white">
        <div class="container">
            <div class="max-w-[780px]">
                <app-breadcrumb
                    class="laptop:mb-16"
                    title="Our Services"
                    description="Atomania connects Romanian farmers with the machinery, expertise, and technology they need, when they need it. Our platform offers on-demand access to equipment, skilled operators, and advanced tools, making farming more efficient and cost-effective."
                />
            </div>
            <div class="grid laptop:grid-cols-3 gap-x-8 gap-y-8 laptop:gap-y-16">
                <div v-for="(service, serviceIndex) in services">
                    <NuxtImg
                        width="48"
                        height="48"
                        src="/images/icons/service-icon.svg"
                        class="mb-5"
                        v-motion="{
                          initial: {
                            scale: 0.7,
                            opacity: 0
                          },
                          visibleOnce: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: 500
                            },
                          }
                        }"
                    />
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