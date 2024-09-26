<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {contactSchema} from '~/config/validationSchema'
    import {useContactStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppCheckboxInput from '~/components/shared/inputs/AppCheckboxInput.vue'
    import AppTextareaInput from '~/components/shared/inputs/AppTextareaInput.vue'

    const errorStore = useErrorStore()
    const contactStore = useContactStore()

    const loading = ref(false)
    const formData = reactive({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    })
    const isAgreePrivacyPolicy = ref(false)

    const onSubmit = async (values, actions) => {
        console.log(values)
        loading.value = true
        await contactStore.sendContact(values)
        loading.value = false

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }
</script>

<template>
    <Form
        @submit="onSubmit"
        :validation-schema="contactSchema"
    >
        <div class="grid laptop:grid-cols-2 laptop:gap-8">
            <app-input
                id="first_name"
                type="text"
                name="first_name"
                label="First name"
                placeholder="First name"
                v-model="formData.first_name"
            />
            <app-input
                id="last_name"
                type="text"
                name="last_name"
                label="Last name"
                placeholder="Last name"
                v-model="formData.last_name"
            />
        </div>
        <app-input
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="you@company.com"
            v-model="formData.email"
        />
        <app-input
            id="phone"
            type="phone"
            name="phone"
            label="Phone number"
            placeholder="+40 - Enter your phone number"
            v-model="formData.phone"
        />
        <app-textarea-input
            id="message"
            type="textarea"
            name="message"
            label="Message"
            placeholder="Leave us a message..."
            v-model="formData.message"
        />
        <div class="flex items-center justify-between gap-4 my-8">
            <app-checkbox-input
                name="isAgreePrivacyPolicy"
                id="isAgreePrivacyPolicy"
                label="You agree to our friendly privacy policy."
                v-model="isAgreePrivacyPolicy"
            />
        </div>
        <p
            v-if="![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
            class="text-b6 mt-[0] mb-3 text-error-600"
        >
            {{ errorStore.errorMessage }}
        </p>
        <app-button
            button-type="submit"
            title="Send message"
            full-width
            :loading="loading"
        />
    </Form>
</template>