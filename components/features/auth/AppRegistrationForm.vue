<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {signUpSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import {showSuccessMessage} from "~/utils";

    const {login} = useAuth()
    const router = useRouter()
    const authStore = useAuthStore()
    const errorStore = useErrorStore()

    const loading = ref(false)
    const formData = reactive({
        phone: '',
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    })

    const onSubmit = async (values, actions) => {
        loading.value = true
        const response = await authStore.register(values);
        loading.value = false

        if (response?.data?.success) {
            actions.resetForm()
            await router.push('/login')
        }

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
                placeholder="+40 - Enter your phone number "
                v-model="formData.phone"
            />
            <app-input
                id="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Introduceți adresa de e-mail"
                v-model="formData.email"
            />
            <app-input
                id="name"
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                v-model="formData.name"
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
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Re-enter password"
                form-group-class="relative mb-6"
                v-model="formData.password_confirmation"
            />
            <p
                v-if="errorStore.errorCode !== null && ![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
                class="py-2 px-3 mb-3 text-error-600 text-b4 rounded-md bg-error-50"
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
                By clicking “Create account” You agree to our Terms of Use and Privacy Policy
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