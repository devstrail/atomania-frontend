<script setup lang="ts">
    definePageMeta({
        middleware: 'auth'
    })

    import ProfilePageSectionOne from '~/components/features/profile/ProfilePageSectionOne.vue'
</script>

<template>
    <profile-page-section-one/>
</template>