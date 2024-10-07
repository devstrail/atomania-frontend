<script setup lang="ts">
    import {partners} from '~/config'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <p
                class="mb-8 text-gray-500 text-center"
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
                Official partner of these companies
            </p>
            <div
                class="flex flex-wrap items-center justify-center gap-9"
                v-motion="{
                  initial: {
                    y: 30,
                    opacity: 0
                  },
                  visibleOnce: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 400,
                        delay: 400
                    },
                  }
                }"
            >
                <template v-for="(partner, partnerIndex) in partners">
                    <img
                        width="200"
                        :src="partner?.logo"
                        :alt="partner?.title"
                        class="shrink-0"
                    />
                </template>
            </div>
        </div>
    </section>
</template>