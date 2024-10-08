<script setup lang="ts">
    import {Form} from 'vee-validate';
    import {profileSchema} from '~/config/validationSchema'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import {showSuccessMessage} from '~/utils'
    import {useAuthStore, useErrorStore, useProfileStore} from '~/store'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppSpinnerLoader from '~/components/shared/AppSpinnerLoader.vue'

    /* -- Define stores -- */
    const errorStore = useErrorStore()
    const authStore = useAuthStore()
    const profileStore = useProfileStore()

    /* -- Handle Profile Picture -- */
    const selectedImage = ref<File | null>(null)
    const errorMessage = ref('')
    const handleImageUpdate = async (event: Event) => {
        const target = event.target as HTMLInputElement

        if (target && target.files) {
            selectedImage.value = target.files[0]
        }

        if (selectedImage.value) {
            const formData = new FormData()
            formData.append('avatar', selectedImage.value)

            const response = await profileStore.updateAvatar(formData)

            if (response?.data?.success) {
                showSuccessMessage('Fotografia de profil a fost actualizată cu succes')
            }

            if (errorStore.errorMessage) {
                errorMessage.value = errorStore.errorMessage
                return;
            }
        } else {
            errorMessage.value = 'Avatar is required'
        }
    }

    /* -- Handle Profile Information Update -- */
    const loading = ref(false)
    const formData = reactive({
        phone: '',
        email: '',
        name: '',
        // password: '',
        // confirm_password: '',
    })
    const onSubmit = async (values, actions) => {
        const payload = {
            name: values.name,
            phone: values.phone,
        }

        loading.value = true
        const response = await profileStore.updateProfileInfo(payload)
        loading.value = false

        if (response?.data?.success) {
            showSuccessMessage('Profil actualizat cu succes')
        }

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }

    /* -- Fetch Profile -- */
    const fetchProfile = async () => {
        loading.value = true
        await profileStore.fetchProfile()
        loading.value = false
    }
    onMounted(async () => {
        await fetchProfile()

        formData.phone = profileStore?.user?.phone ?? ''
        formData.email = profileStore?.user?.email ?? ''
        formData.name = profileStore?.user?.name ?? ''
    })
</script>

<template>
    <section class="py-8 bg-white">
        <div class="container">
            <app-breadcrumb class="mb-6" title="Profilul meu"/>
            <div class="relative">
                <div
                    v-if="loading"
                    class="w-full h-full absolute top-0 left-0 z-10 grid place-items-center rounded-lg bg-primary-25"
                >
                    <app-spinner-loader spinner-style="w-10 h-10 text-primary-600 fill-white"/>
                </div>
                <div class="flex items-center gap-6">
                    <div
                        class="relative size-[100px] laptop:size-[160px] grid place-items-center rounded-full border-4 border-white bg-gray-50 shadow-elevation-1"
                    >
                        <template v-if="profileStore.loading">
                            <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                <app-spinner-loader
                                    spinner-style="size-10 text-primary-500 fill-primary-50"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <img
                                v-if="profileStore?.user?.avatar"
                                width="100"
                                height="100"
                                :src="profileStore?.user?.avatar ? profileStore?.user?.avatar : '/images/avatar-placeholder.svg'"
                                :alt="profileStore?.user?.name"
                                class="size-[100px] laptop:size-[160px] object-cover rounded-full"
                            />
                            <i v-else class="dt-icon-user-01 text-[60px]"/>
                        </template>
                        <label
                            for="profileImage"
                            class="size-9 laptop:size-11 absolute right-0 bottom-0 grid place-items-center text-primary-600 hover:text-white cursor-pointer rounded-full bg-white hover:bg-primary-500 transition-all"
                        >
                            <i class="dt-icon-camera-01 text-b3 laptop:text-b1"/>
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            @change="handleImageUpdate"
                            accept="image/*"
                            class="absolute opacity-0"
                        />
                    </div>
                    <div>
                        <h4 class="text-gray-900 font-semibold">{{ profileStore?.user?.name }}</h4>
                        <p class="text-gray-600">{{ profileStore?.user?.phone }}</p>
                    </div>
                </div>
                <hr class="my-6 border-gray-200"/>
                <div class="grid laptop:grid-cols-[280px_auto] gap-8">
                    <div>
                        <p class="mb-1 text-gray-700 font-medium text-b4">
                            Informații personale
                        </p>
                        <p class="text-gray-500 text-b4">
                            Actualizați fotografia și detaliile personale
                        </p>
                    </div>
                    <div class="rounded-lg border border-gray-200 shadow-elevation-1">
                        <Form
                            @submit="onSubmit"
                            :validation-schema="profileSchema"
                        >
                            <div class="grid laptop:grid-cols-2 gap-x-6 p-6">
                                <app-input
                                    id="name"
                                    type="text"
                                    name="name"
                                    label="Nume complet"
                                    placeholder="Enter your full name"
                                    v-model="formData.name"
                                />
                                <app-input
                                    id="phone"
                                    type="phone"
                                    name="phone"
                                    label="Număr de telefon"
                                    placeholder="Enter your phone number"
                                    v-model="formData.phone"
                                />
                                <app-input
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="E-mail"
                                    read-only
                                    placeholder="Introduceți adresa de e-mail"
                                    v-model="formData.email"
                                />
                                <!--<app-input
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Minimum 6 characters"
                                    v-model="formData.password"
                                />-->
                            </div>
                            <p
                                v-if="errorStore.errorCode !== null && ![401,422].includes(errorStore.errorCode) && errorStore.errorMessage"
                                class="text-b6 mt-[0] mb-3 text-danger"
                            >
                                {{ errorStore.errorMessage }}
                            </p>
                            <hr class="border-gray-200"/>
                            <div class="flex items-center gap-2 justify-end p-6">
                                <app-button
                                    button-type="submit"
                                    title="Salvare modificări"
                                    :loading="loading"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>