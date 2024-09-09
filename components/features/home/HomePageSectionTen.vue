<script setup lang="ts">
    import {partners} from '~/config'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <p class="mb-8 text-gray-500 text-center">
                Official partner of these companies
            </p>
            <div class="flex flex-wrap items-center justify-center gap-9">
                <template v-for="(partner, partnerIndex) in partners">
                    <img width="150" :src="partner?.logo" :alt="partner?.title">
                </template>
            </div>
        </div>
    </section>
</template>