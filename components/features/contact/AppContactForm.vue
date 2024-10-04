<script setup lang="ts">
    import {Form} from 'vee-validate'
    import {contactSchema} from '~/config/validationSchema'
    import {useContactStore, useErrorStore} from '~/store'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppCheckboxInput from '~/components/shared/inputs/AppCheckboxInput.vue'
    import AppTextareaInput from '~/components/shared/inputs/AppTextareaInput.vue'
    import Swal from "sweetalert2";

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
        loading.value = true
        const response = await contactStore.sendContact(values)
        loading.value = false

        if (response?.data?.success) {
            Swal.fire({
                title: 'Mulțumim că ne-ați contactat!',
                text: 'Mesajul dumneavoastră a fost primit și vă vom răspunde în cel mai scurt timp.',
                icon: 'success',
                timer: 5000,
                showConfirmButton: true,
                confirmButtonText: 'Închide',
                customClass: {
                    confirmButton: 'inline-flex gap-2 text-white border border-primary-600 disabled:border-primary-200 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 disabled:cursor-not-allowed font-medium items-center justify-center h-[44px] py-[12px] px-[18px] text-[16px] leading-[24px] rounded-[8px] transition-all w-full laptop:w-[initial] shrink-0'
                },
                timerProgressBar: true
            });
            actions.resetForm()
        }

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
                label="Prenume"
                placeholder="Prenume"
                v-model="formData.first_name"
            />
            <app-input
                id="last_name"
                type="text"
                name="last_name"
                label="Nume"
                placeholder="Nume"
                v-model="formData.last_name"
            />
        </div>
        <app-input
            id="email"
            type="email"
            name="email"
            label="E-mail"
            placeholder="you@company.com"
            v-model="formData.email"
        />
        <app-input
            id="phone"
            type="phone"
            name="phone"
            label="Număr de telefon"
            placeholder="+40 - Enter your phone number"
            v-model="formData.phone"
        />
        <app-textarea-input
            id="message"
            type="textarea"
            name="message"
            label="Mesaj"
            placeholder="Lăsați-ne un mesaj..."
            v-model="formData.message"
        />
        <div class="flex items-center justify-between gap-4 my-8">
            <app-checkbox-input
                name="isAgreePrivacyPolicy"
                id="isAgreePrivacyPolicy"
                label="Sunteți de acord cu politica noastră de confidențialitate prietenoasă"
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
            title="Trimiteți mesaj"
            full-width
            :loading="loading"
        />
    </Form>
</template>