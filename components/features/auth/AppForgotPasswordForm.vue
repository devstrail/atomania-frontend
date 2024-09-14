<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {forgotPasswordSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    const {login} = useAuth()
    const router = useRouter()
    const authStore = useAuthStore();
    const errorStore = useErrorStore();

    const loading = ref(false);
    const formData = reactive({
        email: ''
    });

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
        <p class="mb-8 text-gray-500 text-center">
            Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
        <Form
            @submit="onSubmit"
            :validation-schema="forgotPasswordSchema"
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
            <div class="mb-3 text-right">
                <NuxtLink
                    to="/login"
                    class="text-gray-700 text-b4 font-medium"
                >
                    Back to Login
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
                button-size="large"
                title="Send Email"
                full-width
                :loading="loading"
            />
        </Form>
    </div>
</template>