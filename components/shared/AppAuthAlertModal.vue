<script setup lang="ts">
    import {useAuthStore} from '~/store'
    import AppModal from '~/components/shared/AppModal.vue'
    import AppIcon from '~/components/shared/AppIcon.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        }
    })

    const authStore = useAuthStore()
    const router = useRouter()

    const handleNavigation = (url: string): void => {
        router.push(url)
        authStore.isAuthAlertModalOpen = false
    }
</script>

<template>
    <app-modal :is-open="isOpen" @update:isOpen="val => $emit('update:isOpen', val)">
        <div class="flex flex-col items-stretch justify-center text-center">
            <app-icon
                icon="dt-icon-log-in-03"
                class="mx-auto"
                color="text-warning-600 bg-warning-100 border-warning-50"
                :delay="0"
            />
            <p class="mt-6 mb-2 text-gray-900 font-medium text-b2">
                Conectați-vă pentru a vedea detalii.
            </p>
            <p class="text-gray-500 text-b4">
                Trebuie să vă autentificați pentru a avea acces la detalii.
            </p>
            <div class="mt-6 grid grid-cols-2 gap-4">
                <AppButton
                    button-color="secondary"
                    full-width
                    :on-click-button="() => handleNavigation('/login')"
                >
                    Autentificare
                </AppButton>
                <AppButton
                    full-width
                    :on-click-button="() => handleNavigation('/sign-up')"
                >
                    Înscriere
                </AppButton>
            </div>
        </div>
    </app-modal>
</template>