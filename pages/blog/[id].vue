<script setup lang="ts">
    import dayjs from 'dayjs'
    import Swal from 'sweetalert2'
    import tippy from 'tippy.js'
    import 'tippy.js/dist/tippy.css'
    import {Form} from 'vee-validate';
    import {useBlogStore, useErrorStore, useSubscriberStore} from '~/store'
    import {subscriptionSchema} from '~/config/validationSchema'
    import type {Instance as TippyInstance} from 'tippy.js'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'

    /* -- Define stores -- */
    const errorStore = useErrorStore()
    const subscriberStore = useSubscriberStore()
    const blogStore = useBlogStore()

    const route = useRoute()
    const blog = ref(null)

    /* -- Fetch Blog -- */
    const findBlogById = async (id) => {
        await blogStore.getBlog(id)
    }
    onMounted(() => {
        const id = route.params.id
        findBlogById(id)
    })

    /* -- Handle Copy Blog Url -- */
    let tippyInstance: TippyInstance | null = null
    const copyButtonElementRef = ref<HTMLButtonElement | null>(null)
    const copyBlogUrl = async () => {
        try {
            await navigator.clipboard.writeText(`https://www.atomania.ro/blog/${blogStore?.blog?.id}`)
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
        loading.value = true
        const response = await subscriberStore.storeSubscriber(values)
        loading.value = false

        if (response?.data?.success) {
            Swal.fire({
                title: 'Mulțumim pentru abonare!',
                text: 'Ați fost abonat cu succes la newsletter-ul nostru. Vă vom ține la curent cu cele mai recente știri și actualizări.',
                icon: 'success',
                timer: 5000,
                showConfirmButton: true,
                confirmButtonText: 'Închide',
                customClass: {
                    confirmButton: 'inline-flex gap-2 text-white border border-primary-600 disabled:border-primary-200 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 disabled:cursor-not-allowed font-medium items-center justify-center h-[44px] py-[12px] px-[18px] text-[16px] leading-[24px] rounded-[8px] transition-all w-full laptop:w-[initial] shrink-0'
                },
                timerProgressBar: true
            })
            actions.resetForm()
        }

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }
</script>

<template>
    <section class="py-10 laptop:py-14 bg-white">
        <div class="container">
            <h3 class="mb-8 laptop:mb-16 text-gray-900 font-semibold">
                {{ blogStore?.blog?.title }}
            </h3>
            <NuxtImg
                width="1216"
                height="516"
                :src="blogStore?.blog?.image"
                :alt="blogStore?.blog?.title"
                class="w-full mb-8 rounded-2xl"
            />
            <div class="mb-7 laptop:mb-14 flex gap-5 flex-wrap items-start justify-between">
                <div class="flex gap-16">
                    <!--<div>
                        <p class="mb-3 text-primary-600 font-semibold text-b4">Credit by</p>
                        <p class="text-gray-900 font-medium text-b2">{{ blogStore?.blog?.author?.name }}</p>
                    </div>-->
                    <div>
                        <p class="mb-3 text-primary-600 font-semibold text-b4">Published on</p>
                        <p class="text-gray-900 font-medium text-b2">
                            {{ dayjs(blogStore?.blog?.updated_at).format('DD MMM YYYY') }}
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
                <div class="blog-content" v-html="blogStore?.blog?.content"/>
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
                        <!--<p class="mb-4 text-gray-500 text-b4">
                            Read about our
                            <NuxtLink to="/"><u>privacy policy</u>.</NuxtLink>
                        </p>-->
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