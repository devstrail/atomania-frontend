<script setup lang="ts">
    import AboutPageSectionOne from '~/components/features/about/AboutPageSectionOne.vue'
    import AboutPageSectionTwo from '~/components/features/about/AboutPageSectionTwo.vue'
    import AboutPageSectionThree from '~/components/features/about/AboutPageSectionThree.vue'
    import AboutPageSectionFour from '~/components/features/about/AboutPageSectionFour.vue'
</script>

<template>
    <about-page-section-one/>
    <ClientOnly>
        <about-page-section-two/>
    </ClientOnly>
    <about-page-section-three/>
    <about-page-section-four/>
</template>