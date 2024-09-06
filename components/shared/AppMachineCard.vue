<script setup lang="ts">
    import AppButton from "~/components/shared/AppButton.vue";

    const props = defineProps({
        machine: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="flex flex-col justify-between">
        <NuxtImg
            width="384"
            height="220"
            :src="machine?.thumbnail"
            :alt="machine?.name"
            class="mb-4 rounded-2xl"
        />
        <div class="mb-1 flex items-center gap-1">
            <h6 class="text-royal-flycatcher-crest-500 font-semibold">
                {{ machine?.cost }}
            </h6>
            <span class="text-gray-500 text-b5">/ {{ machine?.cost_unit }}</span>
        </div>
        <h6  class="mb-2 text-gray-900 font-semibold">
            {{ machine?.name }}
        </h6>
        <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <NuxtImg
                    width="28"
                    height="28"
                    :src="machine?.author?.avatar"
                    :alt="machine?.author?.name"
                    class="rounded-full"
                />
                {{ machine?.author?.name }}
            </div>
            <div class="flex items-center">
                <span class="text-gray-600 font-medium text-b4">
                    {{ machine?.address }}
                </span>
            </div>
        </div>
        <p class="mb-4 text-gray-500 text-b3">{{ machine?.description }}</p>
        <div class="mb-6 flex items-center flex-wrap gap-2">
            <div class="py-1 px-3 text-gray-500 text-b5 rounded-3xl border border-gray-200">
                {{ machine?.available_unit }} Unit Available
            </div>
            <template v-for="(machineConfig, machineConfigIndex) in machine?.configurations">
                <div class="py-1 px-3 text-gray-500 text-b5 rounded-3xl border border-gray-200">
                    {{ machineConfig?.value }} {{ machineConfig?.key === 'horsepower' ? 'HP' : '' }}
                </div>
            </template>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <app-button
                title="View details"
                full-width
                button-color="secondary"
            />
            <app-button
                title="Order now"
                full-width
            />
        </div>
    </div>
</template>