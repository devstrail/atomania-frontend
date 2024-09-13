<script setup lang="ts">
    import dayjs from 'dayjs';
    import {Form} from 'vee-validate'
    import {navItems} from '~/config'
    import {subscriptionSchema} from '~/config/validationSchema'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const {locale, setLocale} = useI18n()

    /* -- Handle Subscription -- */
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
    <footer
        class="bg-gray-50"
        v-motion="{
          initial: {
            y: 50,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 400
            },
          }
        }"
    >
        <div class="container">
            <div class="py-8 laptop:py-16 flex flex-wrap justify-center laptop:justify-between laptop:items-end gap-5">
                <div>
                    <NuxtLink to="/">
                        <AppLogo class="mx-auto laptop:mx-0"/>
                    </NuxtLink>
                    <nav class="mt-4 laptop:mt-8">
                        <ul class="flex flex-wrap items-center justify-center gap-3 laptop:gap-8">
                            <li v-for="(navItem, navItemIndex) in navItems" :key="navItemIndex">
                                <NuxtLink
                                    :to="navItem?.url"
                                    class="text-gray-500 hover:text-gray-600 font-medium text-b4 laptop:text-b3 transition"
                                >
                                    {{ navItem?.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Form
                        @submit="onSubmit"
                        :validation-schema="subscriptionSchema"
                    >
                        <p class="mb-4 text-gray-900 text-center laptop:text-left">Stay up to date</p>
                        <div class="flex flex-col laptop:flex-row items-center gap-2 laptop:gap-4">
                            <app-input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                form-group-class="mb-0"
                                v-model="formData.email"
                            />
                            <app-button
                                class="w-full laptop:w-[initial] shrink-0"
                                button-type="submit"
                                title="Subscribe"
                                :loading="loading"
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div class="py-8 flex flex-wrap gap-2 items-center justify-center laptop:justify-between border-t border-gray-200">
                <p class="text-gray-400 text-[15px]">© {{ dayjs().year() }} Atomania | All rights reserved.</p>
                <div class="flex items-center gap-4">
                    <ul class="flex items-center gap-4">
                        <li>
                            <NuxtLink to="/" class="text-gray-400 hover:text-gray-900 text-[15px] transition">
                                Terms
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/" class="text-gray-400 hover:text-gray-900 text-[15px] transition">
                                Privacy Policy
                            </NuxtLink>
                        </li>
                    </ul>
                    <ul class="flex items-center gap-3">
                        <li>
                            <a href="/" target="_blank" class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/twitter.svg" alt="Twitter icon">
                            </a>
                        </li>
                        <li>
                            <a href="/" target="_blank" class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/linkedin.svg" alt="Linkedin icon">
                            </a>
                        </li>
                        <li>
                            <a href="/" target="_blank" class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/facebook.svg" alt="Facebook icon">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--<h2 class="text-center">Footer</h2>
        <div class="grid place-items-center">
            <h1>Welcome to Atomania</h1>
            <NuxtLink to="/login" class="">Login to continue</NuxtLink>
            <button @click="setLocale('en')" class="hello">en</button>
            <button @click="setLocale('ro')">ro</button>
            <p>{{ $t('welcome') }}</p>
        </div>-->
    </footer>
</template>