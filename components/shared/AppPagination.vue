<script setup>
    const props = defineProps({
        currentPage: {
            type: Number,
            required: true
        },
        lastPage: {
            type: Number,
            required: true
        },
        maxDisplayedPages: {
            type: Number,
            default: 5
        }
    })

    const emit = defineEmits(['page-change'])

    const displayedPages = computed(() => {
        const {currentPage, lastPage, maxDisplayedPages} = props
        const pages = []

        if (lastPage <= maxDisplayedPages) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i)
            }
        } else {
            const leftOffset = Math.floor(maxDisplayedPages / 2);
            let start = currentPage - leftOffset;
            let end = currentPage + leftOffset;

            if (start < 1) {
                start = 1;
                end = maxDisplayedPages;
            }

            if (end > lastPage) {
                end = lastPage;
                start = lastPage - maxDisplayedPages + 1;
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

            if (end < lastPage) {
                if (end < lastPage - 1) {
                    pages.push('...');
                }
                pages.push(lastPage);
            }
        }

        return pages
    })

    const goToPage = (page) => {
        if (page !== '...' && page !== props.currentPage) {
            emit('page-change', page)

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
</script>

<template>
    <nav class="flex items-center justify-between border-t border-gray-200 pt-5 mt-8 laptop:mt-16">
        <!-- Previous button -->
        <div class="flex w-0 flex-1">
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="inline-flex gap-2 items-center text-b5 font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <i class="dt-icon-arrow-left"/>
                Previous
            </button>
        </div>

        <!-- Page numbers -->
        <div class="hidden laptop:flex gap-2">
            <template v-for="page in displayedPages" :key="page">
                <button
                    v-if="page !== '...'"
                    @click="goToPage(page)"
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

        <!-- Next button -->
        <div class="flex w-0 flex-1 justify-end">
            <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === lastPage"
                class="inline-flex gap-2 items-center text-b5 font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
                <i class="dt-icon-arrow-right"/>
            </button>
        </div>
    </nav>
</template>