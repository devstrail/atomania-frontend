<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppIcon from "~/components/shared/AppIcon.vue";
    import AppList from "~/components/shared/AppList.vue";
</script>

<template>
    <section id="benefitsSection" class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-7 laptop:mb-14"
                title="We connect farmers and machine suppliers"
                align="center"
            />
            <div class="grid laptop:grid-cols-2 gap-7 laptop:gap-[96px] items-center">
                <div
                    class="order-2 laptop:order-1"
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
                            delay: 500
                        },
                      }
                    }"
                >
                    <app-icon class="mb-6" icon="dt-icon-message-chat-circle"/>
                    <h5 class="mb-4 text-gray-900 font-semibold">
                        Benefits for Farmers:
                    </h5>
                    <p class="mb-2 text-gray-700 font-semibold text-b1">
                        Boost Your Farm’s Productivity with Atomania
                    </p>
                    <p class="mb-6 text-gray-500 text-b2">
                        Atomania provides Romanian farmers with cost-effective access to the latest agricultural
                        machinery and expert support, helping you achieve higher yields and more efficient operations.
                    </p>
                    <app-list
                        :items="[
                            'Save Costs: Access top-tier equipment without the burden of ownership.',
                            'Increase Efficiency: Hire skilled operators for optimal machinery use.',
                            'Gain Insights: Leverage expert advice and advanced technology to improve farm management.'
                        ]"
                    />
                </div>
                <div
                    class="order-1 laptop:order-2"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      visibleOnce: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <NuxtImg
                        widht="560"
                        height="400"
                        src="/images/features/feature-image-1.jpg"
                        alt="Farmer image"
                        class="w-full rounded-3xl"
                    />
                </div>
                <div
                    class="order-3"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      visibleOnce: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <NuxtImg
                        widht="560"
                        height="400"
                        src="/images/features/feature-image-2.jpg"
                        alt="Farmer image"
                        class="w-full rounded-3xl"
                    />
                </div>
                <div
                    class="order-4"
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
                            delay: 500
                        },
                      }
                    }"
                >
                    <app-icon class="mb-6" icon="dt-icon-zap-fast"/>
                    <h5 class="mb-4 text-gray-900 font-semibold">
                        Benefits for Suppliers (Machinery Providers)
                    </h5>
                    <p class="mb-2 text-gray-700 font-semibold text-b1">
                        Maximize Your Equipment's Potential with Atomania
                    </p>
                    <p class="mb-6 text-gray-500 text-b2">
                        Atomania allows machinery providers to generate additional revenue by renting out their
                        equipment to farmers in need, while also expanding their reach across Romania.
                    </p>
                    <app-list
                        :items="[
                            'Increase Income: Turn idle machinery into a steady income stream.',
                            'Expand Reach: Connect with a wider network of farmers and grow your business.',
                            'Optimize Use: Ensure your machinery is utilized to its full potential.'
                        ]"
                    />
                </div>
            </div>
        </div>
    </section>
</template>