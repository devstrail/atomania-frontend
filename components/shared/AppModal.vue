<script setup>
    import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from '@headlessui/vue'
    import {nextTick} from "vue";

    const props = defineProps({
        isOpen: {
            type: Boolean,
            required: true
        },
        maxWidth: {
            type: String,
            default: 'max-w-md'
        }
    })

    const emit = defineEmits(['update:isOpen'])

    const closeModal = () => {
        emit('update:isOpen', false)
    }
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed z-[100] inset-0 bg-black bg-opacity-25"/>
            </TransitionChild>

            <div class="fixed z-[101] inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            :class="[`w-full ${maxWidth} py-6 px-8 transform overflow-hidden rounded-xl bg-white align-middle shadow-xl transition-all`]"
                        >
                            <button
                                type="button"
                                class="size-11 absolute top-4 right-4 grid place-items-center text-gray-500 text-b1 rounded-lg hover:bg-gray-50 transition-all"
                                @click.prevent="closeModal"
                            >
                                <i class="dt-icon-x-close"/>
                            </button>
                            <slot/>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style>
    #headlessui-portal-root {
        z-index: 51;
        position: relative;
    }
</style>