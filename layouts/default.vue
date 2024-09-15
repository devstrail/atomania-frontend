<script setup lang="ts">
    import {useAuthStore} from '~/store'
    import AppCommonLayoutHeader from '~/components/layouts/common/AppCommonLayoutHeader.vue'
    import AppCommonLayoutFooter from '~/components/layouts/common/AppCommonLayoutFooter.vue'
    import AppAuthAlertModal from '~/components/shared/AppAuthAlertModal.vue'

    const authStore = useAuthStore()
</script>

<template>
    <div class="prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop min-h-screen flex flex-col pt-[72px] laptop:pt-[96px]">
        <AppCommonLayoutHeader/>
        <slot/>
        <AppCommonLayoutFooter class="mt-auto"/>
        <app-auth-alert-modal v-model:isOpen="authStore.isAuthAlertModalOpen" />
    </div>
</template>
