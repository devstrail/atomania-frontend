<script setup lang="ts">
    import {blogs} from '~/config'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppBlogCard from '~/components/shared/AppBlogCard.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <div class="mb-7 laptop:mb-14 flex flex-col laptop:flex-row laptop:items-center justify-between gap-5">
                <app-breadcrumb
                    class="max-w-[780px]"
                    title="Stay Ahead with Expert Market Insights"
                    description="Dive into our comprehensive blog posts for in-depth analysis, trends, and updates on the agricultural market. Gain valuable knowledge to make informed decisions, understand market dynamics, and stay ahead of industry changes to enhance your farming strategy and profitability."
                />
                <app-button title="View All Posts" url="/blog"/>
            </div>
            <div class="grid laptop:grid-cols-3 gap-8">
                <template v-for="(blog, blogIndex) in blogs.slice(0, 3)">
                    <app-blog-card :post="blog"/>
                </template>
            </div>
        </div>
    </section>
</template>