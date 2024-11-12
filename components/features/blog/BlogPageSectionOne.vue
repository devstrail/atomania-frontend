<script setup lang="ts">
    import {useBlogStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppBlogCard from '~/components/shared/AppBlogCard.vue'
    import AppPagination from '~/components/shared/AppPagination.vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'

    /* -- Define Store -- */
    const blogStore = useBlogStore()
    const paginationStore = usePaginationStore()

    /* -- Fetch Blogs -- */
    const loading = ref(false)
    const fetchBlogs = async (page = 1) => {
        loading.value = true

        try {
            await blogStore.fetchBlogs({ page })
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            loading.value = false
        }
    }
    onMounted(() => {
        fetchBlogs()
    })

    /* -- Handle Pagination -- */
    const handlePageChange = (newPage) => {
        fetchBlogs(newPage)
    }
    watch(() => paginationStore.current_page, (newPage) => {
        if (newPage !== paginationStore.current_page) {
            fetchBlogs(newPage)
        }
    })
</script>

<template>
    <section class="pb-10 laptop:pb-[96px] bg-white">
        <div class="pt-10 laptop:pt-[96px] pb-[150px] bg-gray-50">
            <div class="container">
                <app-breadcrumb
                    title="Blog"
                    description="Ne place să împărtășim cele mai recente informații despre agricultură cu utilizatorul nostru."
                />
            </div>
        </div>
        <div class="container -mt-[100px]">
            <div class="relative">
                <div
                    v-if="loading"
                    class="w-full h-full min-h-[400px] grid place-items-center rounded-lg bg-primary-25"
                >
                    <app-spinner-loader
                        spinner-style="w-10 h-10 text-primary-600 fill-white"
                    />
                </div>
                <div v-else class="grid laptop:grid-cols-3 gap-x-8 gap-y-8 laptop:gap-y-16">
                    <template v-for="(blog, blogIndex) in blogStore.blogs">
                        <app-blog-card :post="blog"/>
                    </template>
                </div>
            </div>
            <app-pagination
                :current-page="paginationStore.current_page"
                :last-page="paginationStore.last_page"
                @page-change="handlePageChange"
            />
        </div>
    </section>
</template>