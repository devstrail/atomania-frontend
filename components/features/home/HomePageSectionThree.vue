<script setup lang="ts">
    import {machines} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppMachineCard from "~/components/shared/AppMachineCard.vue";
</script>

<template>
    <section class="laptop:py-[96px] bg-wispy-white-25">
        <div class="container">
            <app-breadcrumb
                class="mb-8"
                title="Find machines"
                description="All machine are available to us."
            />

            <div class="grid grid-cols-3 gap-x-8 gap-y-16">
                <template v-for="(machine, machineIndex) in machines">
                    <app-machine-card :machine="machine"/>
                </template>
            </div>
        </div>
    </section>
</template>