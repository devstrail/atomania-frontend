<script setup lang="ts">
    definePageMeta({
        middleware: 'auth'
    })

    import OrderPageSectionOne from '~/components/features/orders/OrderPageSectionOne.vue'
</script>

<template>
    <order-page-section-one/>
</template>