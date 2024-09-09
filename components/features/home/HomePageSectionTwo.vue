<script setup lang="ts">
    import {services} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppIcon from "~/components/shared/AppIcon.vue";
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <div class="max-w-[780px]">
                <app-breadcrumb
                    class="mb-8 laptop:mb-16"
                    title="Our Services"
                    description="Atomania connects Romanian farmers with the machinery, expertise, and technology they need, when they need it. Our platform offers on-demand access to equipment, skilled operators, and advanced tools, making farming more efficient and cost-effective."
                />
            </div>
            <div class="grid laptop:grid-cols-3 gap-x-8 gap-y-8 laptop:gap-y-16">
                <div v-for="(service, serviceIndex) in services">
                    <app-icon class="mb-5" icon="dt-icon-zap"/>
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