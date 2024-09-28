<script setup lang="ts">
    import {blogs} from '~/config'
    import {useBlogStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppBlogCard from '~/components/shared/AppBlogCard.vue'
    import AppPagination from '~/components/shared/AppPagination.vue'

    /* -- Define Store -- */
    const blogStore = useBlogStore()

    const currentPage = ref(1)
    const totalPages = ref(10) // Replace with your actual total pages

    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        // Fetch new data or update your content here
    }

    /* -- Fetch Blogs -- */
    const loading = ref(false)
    const fetchBlogs = async () => {
        loading.value = true
        await blogStore.fetchBlogs()
        loading.value = false
    }
    onMounted(() => {
        fetchBlogs()
    })
</script>

<template>
    <section class="pb-10 laptop:pb-[96px] bg-white">
        <div class="pt-10 laptop:pt-[96px] pb-[150px] bg-gray-50">
            <div class="container">
                <app-breadcrumb
                    title="Blog"
                    description="We love to share latest farming information with our user."
                />
            </div>
        </div>
        <div class="container -mt-[100px]">
            <div class="grid laptop:grid-cols-3 gap-x-8 gap-y-8 laptop:gap-y-16">
                <template v-for="(blog, blogIndex) in blogStore.blogs">
                    <app-blog-card :post="blog"/>
                </template>
            </div>
            <!--<app-pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="handlePageChange"
            />-->
        </div>
    </section>
</template>