<script setup>
    const props = defineProps({
        items: {
            type: Number,
            default: 5
        }
    });
</script>

<template>
    <div class="w-full space-y-7">
        <div
            class="animate-pulse flex items-center space-x-4"
            v-for="item in items"
        >
            <div class="rounded bg-artboard h-11 w-11"/>
            <div class="flex-1 space-y-2 py-1">
                <div class="h-2 bg-[#F5F4F6] rounded-xsm"/>
                <div class="h-2 bg-[#F5F4F6] rounded-xsm"/>
            </div>
        </div>
    </div>
</template>