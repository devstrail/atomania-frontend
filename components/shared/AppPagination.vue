<script setup>
    const props = defineProps({
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        maxDisplayedPages: {
            type: Number,
            default: 5
        }
    });

    defineEmits(['page-change']);

    const displayedPages = computed(() => {
        const {currentPage, totalPages, maxDisplayedPages} = props;
        const pages = [];

        if (totalPages <= maxDisplayedPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftOffset = Math.floor(maxDisplayedPages / 2);
            let start = currentPage - leftOffset;
            let end = currentPage + leftOffset;

            if (start < 1) {
                start = 1;
                end = maxDisplayedPages;
            }

            if (end > totalPages) {
                end = totalPages;
                start = totalPages - maxDisplayedPages + 1;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) {
                    pages.push('...');
                }
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages) {
                if (end < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    });
</script>

<template>
    <nav class="flex items-center justify-between border-t border-gray-200 pt-5 mt-8 laptop:mt-16">
        <div class="flex w-0 flex-1">
            <button
                @click="$emit('page-change', currentPage - 1)"
                :disabled="currentPage === 1"
                class="inline-flex gap-2 items-center text-b5 font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <i class="dt-icon-arrow-left"/>
                Previous
            </button>
        </div>
        <div class="hidden laptop:flex gap-2">
            <template v-for="page in displayedPages" :key="page">
                <button
                    v-if="page !== '...'"
                    @click="$emit('page-change', page)"
                    :class="[
                        page === currentPage ? 'text-gray-800 bg-gray-50' : 'text-gray-800 bg-transparent hover:bg-gray-50',
                        'size-10 inline-flex items-center justify-center text-b4 font-medium rounded-full'
                    ]"
                >
                    {{ page }}
                </button>
                <span
                    v-else
                    class="size-10 inline-flex items-center justify-center text-b4 font-medium"
                >
                  ...
                </span>
            </template>
        </div>
        <div class="flex w-0 flex-1 justify-end">
            <button
                @click="$emit('page-change', currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="inline-flex gap-2 items-center text-b5 font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <i class="dt-icon-arrow-right"/>
            </button>
        </div>
    </nav>
</template>