<script setup lang="ts">
    import AppModal from '~/components/shared/AppModal.vue'

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    })
</script>

<template>
    <app-modal :is-open="isOpen" @update:isOpen="val => $emit('update:isOpen', val)">
        <div>modal</div>
    </app-modal>
</template>