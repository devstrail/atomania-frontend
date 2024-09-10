<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {navItems} from '~/config'
    import {subscriptionSchema} from '~/config/validationSchema'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const {locale, setLocale} = useI18n()

    // Handle subscribe
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
    <footer class="bg-gray-50">
        <div class="container">
            <div class="py-8 laptop:py-16 flex flex-wrap justify-between laptop:items-end gap-5">
                <div>
                    <NuxtLink to="/">
                        <AppLogo/>
                    </NuxtLink>
                    <nav class="mt-8">
                        <ul class="flex items-center justify-center gap-8">
                            <li v-for="(navItem, navItemIndex) in navItems" :key="navItemIndex">
                                <NuxtLink
                                    :to="navItem?.url"
                                    class="text-gray-500 hover:text-gray-600 font-medium text-b3 transition"
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
                        <p class="mb-4 text-gray-900">Stay up to date</p>
                        <div class="flex flex-col laptop:flex-row items-center gap-5 laptop:gap-4">
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