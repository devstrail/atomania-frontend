<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {loginSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppCheckboxInput from '~/components/shared/inputs/AppCheckboxInput.vue'

    const {login} = useAuth()
    const router = useRouter()
    const authStore = useAuthStore()
    const errorStore = useErrorStore()

    const loading = ref(false)
    const formData = reactive({
        email: '',
        password: ''
    })
    const rememberMe = ref(false)

    const loginAs = async (userType: 'admin' | 'farmer') => {
        await login(userType)
        router.push('/dashboard')
    }

    const onSubmit = async (values, actions) => {
        loading.value = true;
        // authStore.type = 2;
        // router.push('/');
        await authStore.login(values);
        loading.value = false;

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors);
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
                id="email"
                type="email"
                name="email"
                label="Email or Phone"
                placeholder="Enter your email or phone number"
                v-model="formData.email"
            />
            <app-input
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                form-group-class="relative mb-2"
                v-model="formData.password"
            />
            <div class="flex items-center justify-between gap-4 my-6">
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
            </div>
            <p
                v-if="errorStore.errorCode !== null && ![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
                class="text-b6 mt-[0] mb-3 text-danger"
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
    <!--    <button
            @click="loginAs('admin')"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
            Login as Admin
        </button>
        <button
            @click="loginAs('farmer')"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
            Login as Farmer
        </button>-->
</template>