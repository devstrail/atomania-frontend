<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {loginSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput'
    import AppButton from '~/components/shared/AppButton'

    const {login} = useAuth()
    const router = useRouter()
    const authStore = useAuthStore();
    const errorStore = useErrorStore();

    const loading = ref(false);
    const formData = reactive({
        email: '',
        password: ''
    });

    const loginAs = async (userType: 'admin' | 'farmer') => {
        await login(userType)
        router.push('/dashboard')
    }

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
    <Form
        @submit="onSubmit"
        :validation-schema="loginSchema"
    >
        <app-input
            id="email"
            type="email"
            name="email"
            label="Email address"
            placeholder="example@axilweb.com"
            input-icon="icon-envelope-regular"
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
        <div class="mb-10 text-right">
<!--            <router-link
                :to="{name: 'auth.forgot_password'}"
                class="text-b4 text-info font-semibold hover:text-teal"
            >
                Forgot Password?
            </router-link>-->
        </div>
        <p
            v-if="![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
            class="text-b6 mt-[0] mb-3 text-danger"
        >
            {{ errorStore.errorMessage }}
        </p>
        <app-button
            button-type="submit"
            button-size="large"
            title="Login"
            full-width
            :loading="loading"
        />
    </Form>
    <button
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
    </button>
</template>