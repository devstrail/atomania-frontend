<script setup>
    import HomePageSectionOne from '~/components/features/home/HomePageSectionOne.vue'
    import HomePageSectionTwo from '~/components/features/home/HomePageSectionTwo.vue'
    import HomePageSectionThree from '~/components/features/home/HomePageSectionThree.vue'
    import HomePageSectionFour from '~/components/features/home/HomePageSectionFour.vue'
    import HomePageSectionFive from '~/components/features/home/HomePageSectionFive.vue'
    import HomePageSectionSix from '~/components/features/home/HomePageSectionSix.vue'
    import HomePageSectionSeven from '~/components/features/home/HomePageSectionSeven.vue'
    import HomePageSectionEight from '~/components/features/home/HomePageSectionEight.vue'
</script>

<template>
    <home-page-section-one/>
    <home-page-section-two/>
    <ClientOnly>
        <home-page-section-three/>
    </ClientOnly>
    <home-page-section-four/>
    <home-page-section-five/>
    <home-page-section-six/>
    <home-page-section-seven/>
    <home-page-section-eight/>
</template>
