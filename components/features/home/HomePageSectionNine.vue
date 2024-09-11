<script setup lang="ts">
    import AppButton from '~/components/shared/AppButton.vue'
</script>

<template>
    <section class="pb-16">
        <div class="container">
            <div
                class="flex flex-col items-center justify-center gap-4 laptop:gap-8 p-5 px-2 laptop:p-8 rounded-2xl bg-[url(/images/backgrounds/cta-green-background.png)] bg-cover bg-center"
                v-motion="{
                  initial: {
                    y: 30,
                    opacity: 0
                  },
                  visibleOnce: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 400
                    },
                  }
                }"
            >
                <div class="flex justify-center items-end">
                    <NuxtImg width="48px" height="48px" src="/images/avatar-1.png" class="shrink-0"/>
                    <NuxtImg width="56px" height="56px" src="/images/avatar-2.png"
                             class="relative z-[1] shrink-0 -mx-2"/>
                    <NuxtImg width="48px" height="48px" src="/images/avatar-3.png" class="shrink-0"/>
                </div>
                <div class="text-center">
                    <p class="mb-2 text-creamy-avocado-500 text-b3 laptop:text-b1 font-medium">
                        10,000+ people are already connected
                    </p>
                    <p class="mb-2 text-white text-b4 laptop:text-b2">
                        Join us to transform our farming industry
                    </p>
                </div>
                <app-button
                    title="Join us"
                    class="!text-primary-700 !bg-primary-50 hover:!bg-primary-100"
                />
            </div>
        </div>
    </section>
</template>