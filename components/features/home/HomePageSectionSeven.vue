<script setup lang="ts">
    import {blogs} from '~/config'
    import {useBlogStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppBlogCard from '~/components/shared/AppBlogCard.vue'

    /* -- Define Store -- */
    const blogStore = useBlogStore()

    /* -- Fetch Blogs -- */
    const loading = ref(false)
    const fetchBlogs = async (page = 1) => {
        loading.value = true
        await blogStore.fetchBlogs({ page })
        loading.value = false
    }
    onMounted(() => {
        fetchBlogs()
    })
</script>

<template>
    <section id="blogSection" class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <div class="mb-7 laptop:mb-14 flex flex-col laptop:flex-row laptop:items-center justify-between gap-5">
                <app-breadcrumb
                    class="max-w-[780px]"
                    title="Fii întotdeauna la curent cu actualele tendințe"
                    description="Explorați postările noastre cuprinzătoare de pe blog pentru analize aprofundate, tendințe și actualizări privind piața agricolă. Dobândiți cunoștințe valoroase pentru a lua decizii în cunoștință de cauză, a înțelege dinamica pieței și a vă situa în fața schimbărilor din industrie pentru a vă îmbunătăți strategia agricolă și profitabilitatea."
                />
                <app-button class="shrink-0" title="Vezi toate postările" url="/blog"/>
            </div>
            <div class="grid laptop:grid-cols-3 gap-8">
                <template v-for="(blog, blogIndex) in blogStore.blogs.slice(0, 3)">
                    <app-blog-card :post="blog"/>
                </template>
            </div>
        </div>
    </section>
</template>