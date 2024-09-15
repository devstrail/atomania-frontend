<script setup lang="ts">
    import {machines} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppMachineCard from '~/components/shared/AppMachineCard.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const emit = defineEmits(['switchTab'])
</script>

<template>
    <div>
        <app-breadcrumb
            class="mb-8"
            title="Saved machine"
            title-class="!mb-2"
            description="We have all the best drone in country."
        />

        <div class="min-h-[380px] flex gap-6 flex-col items-center justify-center text-center">
            <NuxtImg
                width="160"
                height="160"
                src="/images/empty-list.png"
                alt="Empty icon"
            />
            <div>
                <p class="mb-2 text-gray-700 font-semibold text-b2">Empty list</p>
                <p class="text-gray-500 text-b4">There is no saved machine in your list.</p>
            </div>
            <app-button
                title="Find machine"
                class="!px-20"
                :on-click-button="() => emit('switchTab', 1)"
            />
        </div>

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