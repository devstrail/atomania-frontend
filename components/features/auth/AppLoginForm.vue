<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {loginSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppCheckboxInput from '~/components/shared/inputs/AppCheckboxInput.vue'

    const router = useRouter()
    const authStore = useAuthStore()
    const errorStore = useErrorStore()

    const loading = ref(false)
    const formData = reactive({
        username: '',
        password: ''
    })
    const rememberMe = ref(false)

    const onSubmit = async (values, actions) => {
        loading.value = true
        await authStore.login(values)
        loading.value = false

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }
</script>

<template>
    <div
        v-motion="{
          initial: {
            scale: 0.97,
            opacity: 0
          },
          enter: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 400
            },
          }
        }"
    >
        <h5 class="mb-1 text-center">Welcome back</h5>
        <p class="mb-8 text-gray-500 text-center">Welcome back! Please enter your details.</p>
        <Form
            @submit="onSubmit"
            :validation-schema="loginSchema"
        >
            <app-input
                id="username"
                type="text"
                name="username"
                label="Email or Phone"
                placeholder="Enter your email or phone number"
                v-model="formData.username"
            />
            <app-input
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                v-model="formData.password"
            />
            <!--form-group-class="relative mb-2"-->
            <!--<div class="flex items-center justify-between gap-4 my-6">
                <app-checkbox-input
                    name="rememberMe"
                    id="rememberMe"
                    label="Remember me"
                    v-model="rememberMe"
                />
                <NuxtLink
                    to="/forgot-password"
                    class="text-gray-700 text-b4 font-medium"
                >
                    Forgot Password?
                </NuxtLink>
            </div>-->
            <p
                v-if="errorStore.errorCode !== null && errorStore.errorMessage"
                class="py-2 px-3 mb-3 text-error-600 text-b4 rounded-md bg-error-50"
            >
                {{ errorStore.errorMessage }}
            </p>
            <app-button
                button-type="submit"
                title="Sign in"
                full-width
                :loading="loading"
            />
            <div class="flex items-center justify-center mt-8 gap-1 text-gray-500 text-b4">
                Don’t have an account?
                <NuxtLink to="/sign-up" class="text-primary-600 font-medium">
                    Sign up
                </NuxtLink>
            </div>
        </Form>
    </div>
</template>