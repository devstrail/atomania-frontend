<script setup lang="ts">
    import AppButton from '~/components/shared/AppButton.vue'

    const props = defineProps({
        drone: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div
        class="flex flex-col justify-between p-6 rounded-[20px] bg-white"
        v-motion="{
          initial: {
            y: 30,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 700
            },
          }
        }"
    >
        <NuxtImg
            width="384"
            height="296"
            :src="drone?.image"
            :alt="drone?.name"
            class="mb-4 rounded-2xl"
        />
        <p class="mb-3 text-primary-700 text-b4">
            {{ drone?.drone_type }}
        </p>
        <h6 class="mb-2 text-gray-900 font-semibold">
            {{ drone?.name }}
        </h6>
        <p class="mb-6 text-gray-500 text-b3">{{ drone?.description }}</p>
        <app-button
            full-width
            button-color="secondary"
        >
            <i class="dt-icon-phone"/> Call for drones
        </app-button>
    </div>
</template>