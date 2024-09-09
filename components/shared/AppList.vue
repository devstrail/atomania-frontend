<script setup lang="ts">
    const props = defineProps({
        items: {
            type: Array<string | number>,
            required: true
        },
    })
</script>

<template>
    <ul class="flex flex-col gap-4 text-gray-cool-700">
        <li
            v-for="(item, itemIndex) in items"
            class="flex items-baseline gap-2"
        >
            <i class="dt-icon-check-circle text-success-600 text-b4"/>
            {{ item }}
        </li>
    </ul>
</template>