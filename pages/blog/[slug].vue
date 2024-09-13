<script setup lang="ts">
    import dayjs from 'dayjs'
    import {blogs} from '~/config'
    import {slugify} from '~/utils'

    const route = useRoute()
    const blog = ref(null)

    const findBlogBySlug = (slug) => {
        return blogs.find(post => slugify(post.title) === slug)
    }

    onMounted(() => {
        const slug = route.params.slug
        blog.value = findBlogBySlug(slug)
    })
</script>

<template>
    <section class="py-10 laptop:py-14 bg-white">
        <div class="container">
            <h3 class="mb-8 laptop:mb-16 text-gray-900 font-semibold">
                {{ blog?.title }}
            </h3>
            <NuxtImg
                width="1216"
                height="516"
                :src="blog?.thumbnail"
                :alt="blog?.title"
                class="w-full mb-8 rounded-2xl"
            />
            <div class="mb-7 laptop:mb-14 flex items-start justify-between">
                <div class="flex gap-16">
                    <div>
                        <p class="mb-3 text-primary-600 font-semibold text-b4">Credit by</p>
                        <p class="text-gray-900 font-medium text-b2">{{ blog?.author?.name }}</p>
                    </div>
                    <div>
                        <p class="mb-3 text-primary-600 font-semibold text-b4">Published on</p>
                        <p class="text-gray-900 font-medium text-b2">
                            {{ dayjs(post?.created_at).format('DD MMM YYYY') }}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    class="inline-flex gap-2 items-center py-3 px-4 text-gray-700 font-medium text-b4 border border-gray-300 rounded-[8px] bg-white hover:bg-gray-200 transition"
                >
                    <i class="dt-icon-copy-01"/> Copy link
                </button>
            </div>
            <div class="grid laptop:grid-cols-[auto_384px] gap-10 laptop:gap-[96px]">
                <div class="blog-content" v-html="blog?.description"/>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    $stripe-color: #F9FAFB;

    .blog-content {
        h1, h2, h3, h4, h5, h6 {
            color: #101828;
            font-weight: 600;
        }

        p, ul, ol, table {
            color: #667085;
        }

        img {
            border-radius: 16px;
        }

        table {
            width: 100%;
            border-collapse: collapse;

            th, td {
                padding: 20px;
                text-align: left;
                border-bottom: 1px solid #EAECF0;
            }

            th {
                color: #344054;
                background-color: #F2F4F7;
            }

            tr:nth-child(even) {
                background-color: $stripe-color;
            }
        }

        ol {
            li {
                list-style-type: decimal;
            }
        }

        @media (min-width: 768px) {
            h1, h2, h3, h4, h5, h6 {
                margin-bottom: 24px;
            }

            p, ul, ol, table, img {
                margin-bottom: 16px;
            }
        }

        @media (max-width: 767px) {
            h1, h2, h3, h4, h5, h6 {
                margin-bottom: 20px;
            }

            p, ul, ol, table, img {
                margin-bottom: 16px;
            }
        }
    }
</style>