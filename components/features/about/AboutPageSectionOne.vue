<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {phoneSchema} from '~/config/validationSchema'
    import {useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

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
    <section class="py-3 laptop:py-[60px] bg-white">
        <div class="container">
            <div class="grid laptop:grid-cols-[768px_auto] items-center gap-5 laptop:gap-10">
                <div class="order-2 laptop:order-1">
                    <p
                        class="mb-3 text-primary-600 font-medium"
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
                        Nice to meet you
                    </p>
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
                        To be the premier platform connecting agricultural suppliers and farmers, fostering a
                        sustainable and prosperous farming community.
                    </h3>
                    <p
                        class="text-gray-500 text-b2"
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
                        To revolutionize agriculture by providing innovative solutions that improve productivity and
                        sustainability, ensuring that every farmer has access to the best tools and resources for
                        success.
                    </p>
                </div>
                <NuxtImg
                    width="408"
                    height="390"
                    src="/images/banners/banner-image-2.jpg"
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