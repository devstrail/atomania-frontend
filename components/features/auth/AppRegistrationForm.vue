<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {signUpSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const {login} = useAuth()
    const router = useRouter()
    const authStore = useAuthStore()
    const errorStore = useErrorStore()

    const loading = ref(false)
    const formData = reactive({
        phone: '',
        email: '',
        full_name: '',
        password: '',
        confirm_password: '',
    })

    const onSubmit = async (values, actions) => {
        console.log(values)
        loading.value = true;
        await authStore.login(values);
        loading.value = false;

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
        <h5 class="mb-1 text-center">Create account</h5>
        <p class="mb-8 text-gray-500 text-center">Please enter your details to sign up.</p>
        <Form
            @submit="onSubmit"
            :validation-schema="signUpSchema"
        >
            <app-input
                id="phone"
                type="phone"
                name="phone"
                label="Phone number"
                placeholder="Enter your phone number"
                v-model="formData.phone"
            />
            <app-input
                id="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                v-model="formData.email"
            />
            <app-input
                id="full_name"
                type="text"
                name="full_name"
                label="Full Name"
                placeholder="Enter your full name"
                v-model="formData.full_name"
            />
            <app-input
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Minimum 6 characters"
                v-model="formData.password"
            />
            <app-input
                id="confirm_password"
                type="password"
                name="confirm_password"
                label="Confirm Password"
                placeholder="Re-enter password"
                form-group-class="relative mb-6"
                v-model="formData.confirm_password"
            />
            <p
                v-if="errorStore.errorCode !== null && ![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
                class="text-b6 mt-[0] mb-3 text-danger"
            >
                {{ errorStore.errorMessage }}
            </p>
            <app-button
                class="mb-4"
                button-type="submit"
                title="Create account"
                full-width
                :loading="loading"
            />
            <p class="text-gray-700 text-b4">
                By clicking “Create account” You agree to our
                <NuxtLink to="/" class="text-[#1570EF]">Terms of Use</NuxtLink> and
                <NuxtLink to="/" class="text-[#1570EF]">Privacy Policy</NuxtLink>
            </p>
            <div class="flex items-center justify-center mt-8 gap-1 text-gray-500 text-b4">
                Already have an account?
                <NuxtLink to="/login" class="text-primary-600 font-medium">
                    Log in
                </NuxtLink>
            </div>
        </Form>
    </div>
</template>