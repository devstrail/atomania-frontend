<script setup lang="ts">
    definePageMeta({
        middleware: 'auth'
    })

    import MarketplaceSectionOne from '~/components/features/marketplace/MarketplaceSectionOne.vue'
    import MarketplaceSectionTwo from '~/components/features/marketplace/MarketplaceSectionTwo.vue'
</script>

<template>
    <marketplace-section-one/>
    <marketplace-section-two/>
</template>