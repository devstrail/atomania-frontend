<script setup lang="ts">
    import dayjs from 'dayjs'
    import {Form} from 'vee-validate';
    import tippy from 'tippy.js'
    import type {Instance as TippyInstance} from 'tippy.js'
    import 'tippy.js/dist/tippy.css'
    import {blogs} from '~/config'
    import {slugify} from '~/utils'
    import {subscriptionSchema} from '~/config/validationSchema'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'

    const route = useRoute()
    const blog = ref(null)

    const findBlogBySlug = (slug) => {
        return blogs.find(post => slugify(post.title) === slug)
    }

    onMounted(() => {
        const slug = route.params.slug
        blog.value = findBlogBySlug(slug)
    })

    /* -- Handle Copy Blog Url -- */
    let tippyInstance: TippyInstance | null = null
    const copyButtonElementRef = ref<HTMLButtonElement | null>(null)
    const copyBlogUrl = async () => {
        try {
            await navigator.clipboard.writeText('http://localhost:3000/blog/drone-technology-revolutionizing-precision-agriculture')
            if (tippyInstance) {
                tippyInstance?.setContent('Copied!')
                tippyInstance?.show()
                setTimeout(() => {
                    tippyInstance?.hide()
                }, 2000)
            }
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }
    onMounted(() => {
        if (copyButtonElementRef.value) {
            tippyInstance = tippy(copyButtonElementRef.value, {
                content: 'Copy link',
                trigger: 'manual',
                placement: 'top'
            })
        }
    })

    /* -- Handle Newsletter Subscription -- */
    const loading = ref(false)
    const formData = reactive({
        email: ''
    })
    const onSubmit = async (values, actions) => {
        console.log(values)
        loading.value = true
        // await authStore.login(values)
        loading.value = false

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }
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
            <div class="mb-7 laptop:mb-14 flex gap-5 flex-wrap items-start justify-between">
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
                    ref="copyButtonElementRef"
                    type="button"
                    class="inline-flex gap-2 items-center py-3 px-4 text-gray-700 font-medium text-b4 border border-gray-300 rounded-[8px] bg-white hover:bg-gray-200 transition"
                    @click="copyBlogUrl"
                >
                    <i class="dt-icon-copy-01"/> Copy link
                </button>
            </div>
            <div class="grid laptop:grid-cols-[auto_384px] gap-10 laptop:gap-[96px] items-start">
                <div class="blog-content" v-html="blog?.description"/>
                <div class="sticky top-10 py-10 px-8 bg-gray-50 border-t-4 border-primary-700">
                    <div class="size-14 grid place-items-center mb-8 text-primary-600 text-b1 rounded-full bg-success-100">
                        <i class="dt-icon-send-01"/>
                    </div>
                    <h6 class="mb-2 text-gray-900 font-semibold">
                        Weekly newsletter
                    </h6>
                    <p class="mb-8 text-gray-500">
                        No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in
                        your inbox every week.
                    </p>
                    <Form
                        @submit="onSubmit"
                        :validation-schema="subscriptionSchema"
                    >
                        <app-input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            form-group-class="mb-1"
                            :show-error-message="false"
                            v-model="formData.email"
                        />
                        <p class="mb-4 text-gray-500 text-b4">
                            Read about our
                            <NuxtLink to="/"><u>privacy policy</u>.</NuxtLink>
                        </p>
                        <app-button
                            button-type="submit"
                            full-width
                            title="Subscribe"
                            :loading="loading"
                        />
                    </Form>
                </div>
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