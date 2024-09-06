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
        phone: '',
        password: ''
    })
    const rememberMe = ref(false)

    const loginAs = async (userType: 'admin' | 'farmer') => {
        await login(userType)
        router.push('/dashboard')
    }

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
    <Form
        @submit="onSubmit"
        :validation-schema="loginSchema"
    >
        <app-input
            id="phone"
            type="phone"
            name="phone"
            label="Phone number"
            placeholder="example@axilweb.com"
            input-icon="icon-envelope-regular"
            v-model="formData.phone"
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
            v-if="![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
            class="text-b6 mt-[0] mb-3 text-error-600"
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
            <NuxtLink to="/" class="text-primary-600 font-medium">
                Sign up
            </NuxtLink>
        </div>
    </Form>
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