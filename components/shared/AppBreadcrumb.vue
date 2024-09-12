<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String
        },
        description: {
            type: String,
            required: false
        },
        align: {
            type: String,
            default: 'left'
        }
    })

    // Motion properties
    const initialMotion = ref({
        y: 20,
        opacity: 0
    })
    const initialMotionEnter = ref({
        y: 0,
        opacity: 1,
    })

    const textAlign = computed(() => {
        if (props.align === 'left') {
            return 'text-left'
        } else if (props.align === 'center') {
            return 'text-center'
        } else {
            return 'text-right'
        }
    })
</script>

<template>
    <div :class="textAlign">
        <p
            v-if="subtitle"
            class="mb-3 text-primary-600 font-medium"
            v-motion="{
              initial: initialMotion,
              enter: {
                ...initialMotionEnter,
                transition: {
                    duration: 500
                },
              }
            }"
        >
            {{ subtitle }}
        </p>
        <h4 :class="[
                `text-gray-900 font-bold`,
                {'mb-2 laptop:mb-5': description}
            ]"
            v-motion="{
              initial: {
                y: 20,
                opacity: 0
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 500,
                    delay: 550
                },
              }
            }"
        >
            {{ title }}
        </h4>
        <p
            v-if="description"
            class="text-gray-500 laptop:text-b1"
            v-motion="{
              initial: {
                y: 20,
                opacity: 0
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 500,
                    delay: 600
                },
              }
            }"
        >
            {{ description }}
        </p>
    </div>
</template>