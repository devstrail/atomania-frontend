<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: true
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
        <h4 :class="[
                `text-gray-900 font-bold`,
                {'mb-2 laptop:mb-5': description}
            ]"
            v-motion="{
              initial: {
                y: 30,
                opacity: 0
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 500
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
                y: 30,
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
            {{ description }}
        </p>
    </div>
</template>