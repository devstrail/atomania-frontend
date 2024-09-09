<script setup lang="ts">
    import { faqs } from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'

    const expandedIndices = ref<boolean[]>(faqs.map(() => true))

    const toggleExpanded = (index: number) => {
        expandedIndices.value[index] = !expandedIndices.value[index]
    };
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <AppBreadcrumb
                class="mb-6 laptop:mb-14"
                title="Frequently asked questions"
                description="Everything you need to know about the product and billing."
                align="center"
            />
            <ul class="max-w-[768px] flex flex-col space-y-8 mx-auto divide-y divide-gray-200">
                <li v-for="(faq, faqIndex) in faqs" :key="faqIndex" class="pt-8">
                    <div
                        class="flex items-baseline justify-between gap-5 cursor-pointer"
                        @click="toggleExpanded(faqIndex)"
                    >
                        <p class="text-gray-900 font-medium text-b2">{{ faq.question }}</p>
                        <div
                            class="flex items-center justify-center rounded-full border border-gray-400 transition-transform duration-300"
                            :class="{ 'rotate-180': expandedIndices[faqIndex] }"
                        >
                            <span
                                :class="[
                                  'size-5 flex items-center justify-center text-gray-500 leading-[9px] transition-transform duration-200',
                                  expandedIndices[faqIndex] ? '' : 'rotate-0'
                                ]"
                            >
                                {{ expandedIndices[faqIndex] ? '-' : '+' }}
                            </span>
                        </div>
                    </div>
                    <p
                        :class="[
                          'mt-2 text-gray-500 overflow-hidden transition-all duration-300 ease-in-out',
                          expandedIndices[faqIndex] ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        ]"
                    >
                        {{ faq.answer }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>
