<script setup lang="ts">
    const props = defineProps({
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'text-success-600 bg-success-100 border-success-50'
        },
        radius: {
            type: String,
            default: 'rounded-full'
        }
    })
</script>

<template>
    <div
        :class="`size-12 grid place-items-center text-b2 border-8 ${color} ${radius}`"
        v-motion="{
          initial: {
            scale: 0.7,
            opacity: 0
          },
          visibleOnce: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 500,
                delay: 500
            },
          }
        }"
    >
        <i :class="icon"/>
    </div>
</template>