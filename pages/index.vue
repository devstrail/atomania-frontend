<script setup>
    import HomePageSectionOne from '~/components/features/home/HomePageSectionOne.vue'
    import HomePageSectionTwo from '~/components/features/home/HomePageSectionTwo.vue'
    import HomePageSectionThree from '~/components/features/home/HomePageSectionThree.vue'
    import HomePageSectionFour from '~/components/features/home/HomePageSectionFour.vue'
    import HomePageSectionFive from '~/components/features/home/HomePageSectionFive.vue'
    import HomePageSectionSix from '~/components/features/home/HomePageSectionSix.vue'
    import HomePageSectionSeven from '~/components/features/home/HomePageSectionSeven.vue'
    import HomePageSectionEight from '~/components/features/home/HomePageSectionEight.vue'
    import HomePageSectionNine from "~/components/features/home/HomePageSectionNine.vue";
    import HomePageSectionTen from "~/components/features/home/HomePageSectionTen.vue";
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
    <home-page-section-nine/>
    <home-page-section-ten/>
</template>
