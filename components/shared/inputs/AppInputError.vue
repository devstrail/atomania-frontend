<script setup>
    // Define props
    const props = defineProps({
        errorMessage: {}
    });
</script>

<template>
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform -translate-y-0.5 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-0.5 opacity-0">
        <div
            v-if="errorMessage"
            class="absolute top-full left-0 flex items-center gap-1 mt-0.5 text-b5 text-error-600"
        >
            <i class="dt-icon-alert-circle"/>
            <span class="first-letter:capitalize">{{ errorMessage }}</span>
        </div>
    </transition>
</template>