<script setup lang="ts">
    import AppButton from '~/components/shared/AppButton.vue'
    import AppModal from '~/components/shared/AppModal.vue'
    import AppIcon from '~/components/shared/AppIcon.vue'
    import {useClipboard} from '~/composables/useClipboard'

    const props = defineProps({
        expert: {
            type: Object,
            required: true
        }
    })

    const isHireExpertModalOpen = ref(false)
    const copyButtonElementRef = ref(null)
    const { copyToClipboard } = useClipboard()

    const copyNumber = () => {
        copyToClipboard('+40568987985', copyButtonElementRef)
    }
</script>

<template>
    <div
        class="flex flex-col justify-between"
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
            :src="expert?.image"
            :alt="expert?.name"
            class="mb-4 rounded-2xl"
        />
        <div class="mb-4 flex gap-4 items-baseline justify-between">
            <div>
                <h6 class="text-gray-900 font-semibold">
                    {{ expert?.name }}
                </h6>
                <p class="text-primary-700 text-b2">
                    {{ expert?.designation }}
                </p>
            </div>
            <div
                :class="[
                    `py-1 px-3 flex items-center gap-[6px] text-b4 rounded-3xl`,
                    expert?.available ? 'text-success-700 bg-success-50' : 'text-royal-flycatcher-crest-700 bg-royal-flycatcher-crest-50'
                ]"
            >
                <div
                    :class="[
                        `size-2 rounded-full`,
                        expert?.available ? 'bg-success-500' : 'bg-royal-flycatcher-crest-500'
                    ]"
                />
                {{ expert?.available ? 'Available' : 'Unavailable' }}
            </div>
        </div>
        <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-1">
                <h6 class="text-royal-flycatcher-crest-500 font-semibold">
                    €{{ expert?.cost }}
                </h6>
                <span class="text-gray-500 text-b5">/ {{ expert?.cost_unit }}</span>
            </div>
            <div class="flex items-center">
                <span class="text-gray-600 font-medium text-b4">
                    {{ expert?.address }}
                </span>
            </div>
        </div>
        <p class="mb-4 text-gray-500 text-b3">{{ expert?.bio }}</p>
        <div class="mb-4 flex items-center flex-wrap gap-2">
            <template v-for="(expertIn, expertInIndex) in expert?.expertise">
                <div class="py-1 px-3 text-gray-500 text-b5 rounded-3xl border border-gray-200">
                    {{ expertIn }}
                </div>
            </template>
        </div>
        <app-button
            title="Hire Expert"
            full-width
            button-color="secondary"
            :on-click-button="() => isHireExpertModalOpen = true"
        />
    </div>

    <app-modal v-model:is-open="isHireExpertModalOpen">
        <div class="flex flex-col items-center justify-center text-center">
            <app-icon icon="dt-icon-phone-outgoing-01" :delay="0"/>
            <p class="mt-6 mb-3 text-gray-900">
                To hire this expert please call here
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
</template>