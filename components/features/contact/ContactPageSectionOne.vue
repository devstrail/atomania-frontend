<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-[96px]"
                title="We’d love to hear from you"
                subtitle="Contact us"
                description="Our friendly team is always here to contact with you."
            />
            <div class="grid laptop:grid-cols-4 gap-6">
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
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
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-message-smile-circle text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Chat to sales
                    </p>
                    <p class="mb-5 text-gray-500">
                        Speak to our friendly team.
                    </p>
                    <a href="mailto:sales@atomania" class="text-primary-700 font-medium">
                        sales@atomania
                    </a>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 600
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-message-chat-circle text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Chat to support
                    </p>
                    <p class="mb-5 text-gray-500">
                        We’re here to help.
                    </p>
                    <a href="mailto:support@atomania" class="text-primary-700 font-medium">
                        support@atomania
                    </a>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 650
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-marker-pin-02 text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Visit us
                    </p>
                    <p class="mb-5 text-gray-500">
                        Visit our office HQ.
                    </p>
                    <p class="text-primary-700 font-medium">
                        100 Smith Street <br> Collingwood VIC 3066 AU
                    </p>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 700
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-phone text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Call us
                    </p>
                    <p class="mb-5 text-gray-500">
                        Mon-Fri from 8am to 5pm.
                    </p>
                    <a href="tel:+1 (555) 000-0000" class="text-primary-700 font-medium">
                        +1 (555) 000-0000
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>