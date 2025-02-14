<script setup lang="ts">
    import {useAuthStore} from '~/store'
    import AppCommonLayoutHeader from '~/components/layouts/common/AppCommonLayoutHeader.vue'
    import AppCommonLayoutFooter from '~/components/layouts/common/AppCommonLayoutFooter.vue'
    import AppAuthAlertModal from '~/components/shared/AppAuthAlertModal.vue'

    const authStore = useAuthStore()
</script>

<template>
    <div class="bg-white h-screen flex flex-col items-center justify-center">
        <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                504 Gateway Time-out
            </h1>
            <p class="text-lg text-gray-500">nginx</p>
        </div>
        <hr class="w-full border-t border-gray-300 mt-10" />
    </div>
    <!--<div class="prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop min-h-screen flex flex-col pt-[72px] laptop:pt-[96px]">
        <AppCommonLayoutHeader/>
        <slot/>
        <AppCommonLayoutFooter class="mt-auto"/>
        <app-auth-alert-modal v-model:isOpen="authStore.isAuthAlertModalOpen" />
    </div>-->
</template>
