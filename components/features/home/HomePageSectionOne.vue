<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {phoneSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const authStore = useAuthStore();

    useHead({
        title: 'Atomania'
    })

    // Define stores
    const errorStore = useErrorStore()

    // Motion properties
    const initialMotion = ref({
        y: 30,
        opacity: 0
    })
    const initialMotionEnter = ref({
        y: 0,
        opacity: 1,
    })

    // Handle get started
    const loading = ref(false)
    const formData = reactive({
        phone: ''
    })
    const onSubmit = async (values, actions) => {
        console.log(values)
        loading.value = true;
        // await authStore.login(values);
        loading.value = false;

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors);
        }
    }
</script>

<template>
    <section
        :class="[
            `py-3 laptop:py-[60px]`,
            authStore.type === 2 ? 'bg-wispy-white-25' : 'bg-gray-50'
        ]">
        <div class="container">
            <div
                :class="[
                    `grid items-center gap-5`,
                    authStore.type === 2 ? 'laptop:grid-cols-[630px_auto] laptop:gap-[131px]' : 'laptop:grid-cols-[641px_auto] laptop:gap-[52px]'
                ]"
            >
                <div class="order-2 laptop:order-1">
                    <h3
                        class="mb-6 text-gray-900 font-bold"
                        v-motion="{
                          initial: initialMotion,
                          enter: {
                            ...initialMotionEnter,
                            transition: {
                                duration: 600,
                                delay: 500
                            },
                          }
                        }"
                    >
                        <template v-if="authStore.type === 2">
                            We offer <span class="text-royal-flycatcher-crest-500">Smart & Affordable</span>
                            Machines for Better <span class="text-royal-flycatcher-crest-500">Farming.</span>
                        </template>
                        <template v-else>
                            Connecting Romanian <span class="text-royal-flycatcher-crest-500">Farmers</span> with the <span
                            class="text-royal-flycatcher-crest-500">Machinery</span> and <span
                            class="text-royal-flycatcher-crest-500">Expertise</span> They Need, When They Need It.
                        </template>
                    </h3>
                    <p
                        class="mb-6 laptop:mb-12 text-gray-500 text-b2"
                        v-motion="{
                          initial: initialMotion,
                          enter: {
                            ...initialMotionEnter,
                            transition: {
                                duration: 600,
                                delay: 550
                            },
                          }
                        }"
                    >
                        Atomania is transforming the way Romanian farmers access and utilize agricultural machinery and
                        expertise. By connecting farmers with machinery owners, skilled operators, and cutting-edge
                        technology, we’re making farming more efficient and profitable.
                    </p>
                    <div
                        class="max-w-[504px]"
                        v-motion="{
                          initial: initialMotion,
                          enter: {
                            ...initialMotionEnter,
                            transition: {
                                duration: 600,
                                delay: 600
                            },
                          }
                        }"
                    >
                        <app-button
                            v-if="authStore.type === 2"
                            url="/marketplace"
                            class="!px-10"
                            title="Explore marketplace"
                        />
                        <app-button
                            v-else
                            url="/login"
                            class="!px-10"
                            title="Get started"
                        />
                    </div>
                    <!--<div
                        class="max-w-[504px]"
                        v-motion="{
                          initial: initialMotion,
                          enter: {
                            ...initialMotionEnter,
                            transition: {
                                duration: 600,
                                delay: 600
                            },
                          }
                        }"
                    >
                        <Form
                            @submit="onSubmit"
                            :validation-schema="phoneSchema"
                        >
                            <div class="flex flex-col laptop:flex-row items-center gap-5 laptop:gap-4">
                                <app-input
                                    id="phone"
                                    type="phone"
                                    name="phone"
                                    placeholder="Enter your phone"
                                    form-group-class="mb-0"
                                    v-model="formData.phone"
                                />
                                <app-button
                                    class="w-full laptop:w-[initial] shrink-0"
                                    button-type="submit"
                                    title="Get started"
                                    :loading="loading"
                                />
                            </div>
                        </Form>
                    </div>-->
                </div>
                <NuxtImg
                    :width="authStore.type === 2 ? 444 : 560"
                    :height="authStore.type === 2 ? 276 : 602"
                    :src="authStore.type === 2 ? '/images/banners/banner-image-3.jpg' : '/images/banners/banner-image-1.png'"
                    alt="Atomania Logo"
                    quality="100"
                    class="order-1 laptop:order-2"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      enter: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500
                        },
                      }
                    }"
                />
            </div>
        </div>
    </section>
</template>