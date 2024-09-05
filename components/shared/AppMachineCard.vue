<script setup lang="ts">
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
        <div class="flex items-center gap-1">
            <h6 class="text-royal-flycatcher-crest-500 font-semibold">
                {{ machine?.cost }}
            </h6>
            <span class="text-gray-500 text-b5">/ {{ machine?.cost_unit }}</span>
        </div>
        <h4 class="text-gray-900 font-semibold">
            {{ machine?.name }}
        </h4>
        <div class="flex items-center justify-between">
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
    </div>
</template>