<script setup lang="ts">
    import AppButton from '~/components/shared/AppButton.vue'
    import {useClipboard} from '~/composables/useClipboard'
    import AppIcon from '~/components/shared/AppIcon.vue'
    import AppModal from '~/components/shared/AppModal.vue'

    const props = defineProps({
        drone: {
            type: Object,
            required: true
        },

    })

    const isHireDroneModalOpen = ref(false)
    const copyButtonElementRef = ref(null)
    const { copyToClipboard } = useClipboard()

    const copyNumber = () => {
        copyToClipboard('+40568987985', copyButtonElementRef)
    }
</script>

<template>
    <div
        class="flex flex-col justify-between p-6 rounded-[20px] bg-white"
        v-motion="{
          initial: {
            y: 30,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 700
            },
          }
        }"
    >
        <NuxtImg
            width="384"
            height="296"
            :src="drone?.image"
            :alt="drone?.name"
            class="mb-4 rounded-2xl"
        />
        <p class="mb-3 text-primary-700 text-b4">
            {{ drone?.drone_type }}
        </p>
        <h6 class="mb-2 text-gray-900 font-semibold">
            {{ drone?.name }}
        </h6>
        <p class="mb-6 text-gray-500 text-b3">{{ drone?.description }}</p>
        <app-button
            full-width
            button-color="secondary"
            :on-click-button="() => isHireDroneModalOpen = true"
        >
            <i class="dt-icon-phone"/> Call for drones
        </app-button>

        <app-modal v-model:is-open="isHireDroneModalOpen">
            <div class="flex flex-col items-center justify-center text-center">
                <app-icon icon="dt-icon-phone-outgoing-01" :delay="0"/>
                <p class="mt-6 mb-3 text-gray-900">
                    To hire this drone please call here
                </p>
                <a href="tel:+40568987985" class="inline-block mb-6 text-primary-500 font-bold text-h6">
                    +40568987985
                </a>
                <app-button
                    ref="copyButtonElementRef"
                    full-width
                    button-color="secondary"
                    :on-click-button="() => copyNumber()"
                >
                    Copy number <i class="dt-icon-copy-01 ml-1"/>
                </app-button>
            </div>
        </app-modal>
    </div>
</template>