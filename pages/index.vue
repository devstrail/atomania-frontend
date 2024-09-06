<script setup>
    import HomePageSectionOne from '~/components/features/home/HomePageSectionOne.vue'
    import HomePageSectionTwo from '~/components/features/home/HomePageSectionTwo.vue'
    import HomePageSectionThree from '~/components/features/home/HomePageSectionThree.vue'
</script>

<template>
    <home-page-section-one/>
    <home-page-section-two/>
    <ClientOnly>
        <home-page-section-three/>
    </ClientOnly>
</template>
