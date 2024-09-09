<script setup lang="ts">
    import {drones} from '~/config';
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppDroneCard from '~/components/shared/AppDroneCard.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-wispy-white-50">
        <div class="container">
            <div class="mb-7 laptop:mb-14 flex items-center justify-between gap-5">
                <app-breadcrumb
                    class="max-w-[780px]"
                    title="Elevate Your Farming with Drone Technology"
                    description="Leverage Cutting-Edge Aerial Drones to Gain Comprehensive Insights into Crop Health, Optimize Field Management, and Maximize Efficiency Across Your Farm Operations."
                />
                <app-button title="Hire Drone"/>
            </div>
            <div class="grid laptop:grid-cols-3 gap-8">
                <template v-for="(drone, droneIndex) in drones.slice(0, 3)">
                    <app-drone-card :drone="drone"/>
                </template>
            </div>
        </div>
    </section>
</template>