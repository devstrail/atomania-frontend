<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppEmptyStateCard from "~/components/shared/AppEmptyStateCard.vue";

    const emit = defineEmits(['switchTab'])
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Mașină salvată"
            title-class="!mb-2"
        />

        <app-empty-state-card/>

        <!--<div class="grid grid-cols-3 gap-8">
            <template
                v-for="(machine, machineIndex) in machines"
                :key="machine.id"
            >
                <app-machine-card :machine="machine"/>
            </template>
        </div>-->
    </div>
</template>