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
            authStore.user && authStore.user?.userRoles[0] === 'farmer' ? 'bg-wispy-white-25' : 'bg-gray-50'
        ]">
        <div class="container">
            <div
                :class="[
                    `grid items-center gap-5`,
                    authStore.user && authStore.user?.userRoles[0] === 'farmer' ? 'laptop:grid-cols-[630px_auto] laptop:gap-[131px]' : 'laptop:grid-cols-[641px_auto] laptop:gap-[52px]'
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
                        <template v-if="authStore.user && authStore.user?.userRoles[0] === 'farmer'">
                            Oferim <span
                            class="text-royal-flycatcher-crest-500">utilaje inteligente și accesibile</span>
                            pentru o <span class="text-royal-flycatcher-crest-500">agricultură </span> mai bună
                        </template>
                        <template v-else>
                            Conectam <span class="text-royal-flycatcher-crest-500">fermierii</span> romani cu <span
                            class="text-royal-flycatcher-crest-500">utilajele</span> atunci cand au nevoie și asiguram
                            tot suportul necesar.
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
                        Atomania transformă modul în care fermierii români accesează și operează utilajele agricole,
                        precum și expertiza acestora. Prin conectarea fermierilor cu proprietarii de mașini, operatori
                        calificați și tehnologie de ultimă oră, facem agricultura mai eficientă și mai profitabilă
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
                            v-if="authStore.user && authStore.user?.userRoles[0] === 'farmer'"
                            url="/marketplace"
                            class="!px-10"
                            title="Explorați Marketplace-ul"
                        />
                        <app-button
                            v-else
                            url="/login"
                            class="!px-10"
                            title="Începeți"
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
                    :width="authStore.user && authStore.user?.userRoles[0] === 'farmer' ? 444 : 560"
                    :height="authStore.user && authStore.user?.userRoles[0] === 'farmer' ? 276 : 640"
                    :src="authStore.user && authStore.user?.userRoles[0] === 'farmer' ? '/images/banners/banner-image-3.jpg' : '/images/banners/banner-image-1.png'"
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