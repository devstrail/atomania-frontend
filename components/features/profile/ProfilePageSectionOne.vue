<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import {useErrorStore, useProfileStore} from '~/store'
    import {profileSchema, signUpSchema} from "~/config/validationSchema";
    import AppButton from "~/components/shared/AppButton.vue";
    import {Form} from "vee-validate";
    import AppInput from "~/components/shared/inputs/AppInput.vue";

    /* -- Define stores -- */
    const errorStore = useErrorStore();
    const profileStore = useProfileStore();

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

            await profileStore.updateAvatar(formData);

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
        full_name: '',
        password: '',
        confirm_password: '',
    })
    const onSubmit = async (values, actions) => {
        console.log(values)
        loading.value = true
        // await profileStore.updateProfileInfo(values)
        loading.value = false

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }
</script>

<template>
    <section class="py-8 bg-white">
        <div class="container">
            <app-breadcrumb class="mb-6" title="My Profile"/>
            <div class="flex items-center gap-6">
                <div
                    class="relative size-[100px] laptop:size-[160px] grid place-items-center rounded-full border-4 border-white bg-gray-50 shadow-elevation-1"
                >
                    <i class="dt-icon-user-01 text-[60px]"/>
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
                    <h4 class="text-gray-900 font-semibold">Ariful I. Sunny</h4>
                    <p class="text-gray-600">+4089823279</p>
                </div>
            </div>
            <hr class="my-6 border-gray-200"/>
            <div class="grid laptop:grid-cols-[280px_auto] gap-8">
                <div>
                    <p class="mb-1 text-gray-700 font-medium text-b4">
                        Personal info
                    </p>
                    <p class="text-gray-500 text-b4">
                        Update your photo and personal details.
                    </p>
                </div>
                <div class="rounded-lg border border-gray-200 shadow-elevation-1">
                    <Form
                        @submit="onSubmit"
                        :validation-schema="profileSchema"
                    >
                        <div class="grid laptop:grid-cols-2 gap-x-6 p-6">
                            <app-input
                                id="full_name"
                                type="text"
                                name="full_name"
                                label="Full Name"
                                placeholder="Enter your full name"
                                v-model="formData.full_name"
                            />
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
                                id="password"
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Minimum 6 characters"
                                v-model="formData.password"
                            />
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
                                title="Save changes"
                                :loading="loading"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </section>
</template>