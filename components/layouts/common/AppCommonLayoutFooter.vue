<script setup lang="ts">
    import dayjs from 'dayjs'
    import Swal from 'sweetalert2'
    import {Form} from 'vee-validate'
    import {navItems, navItemsFarmer} from '~/config'
    import {subscriptionSchema} from '~/config/validationSchema'
    import {useAuthStore, useErrorStore, useSubscriberStore} from '~/store'
    import AppLogo from '~/components/shared/AppLogo.vue'
    import AppInput from '~/components/shared/inputs/AppInput.vue'
    import AppButton from '~/components/shared/AppButton.vue'

    /* -- Define Utilities -- */
    const router = useRouter()
    const {locale, setLocale} = useI18n()

    /* -- Define stores -- */
    const authStore = useAuthStore()
    const errorStore = useErrorStore()
    const subscriberStore = useSubscriberStore()

    /* -- Handle Subscription -- */
    const loading = ref(false)
    const formData = reactive({
        email: ''
    })
    const onSubmit = async (values, actions) => {
        loading.value = true
        const response = await subscriberStore.storeSubscriber(values)
        loading.value = false

        if (response?.data?.success) {
            Swal.fire({
                title: 'Mulțumim pentru abonare!',
                text: 'Ați fost abonat cu succes la newsletter-ul nostru. Vă vom ține la curent cu cele mai recente știri și actualizări.',
                icon: 'success',
                timer: 5000,
                showConfirmButton: true,
                confirmButtonText: 'Închide',
                customClass: {
                    confirmButton: 'inline-flex gap-2 text-white border border-primary-600 disabled:border-primary-200 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-200 disabled:cursor-not-allowed font-medium items-center justify-center h-[44px] py-[12px] px-[18px] text-[16px] leading-[24px] rounded-[8px] transition-all w-full laptop:w-[initial] shrink-0'
                },
                timerProgressBar: true
            })
            actions.resetForm()
        }

        if (errorStore.errorCode === 422) {
            actions.setErrors(errorStore.formErrors)
        }
    }

    /* -- Handle MenuItems -- */
    const menuItems = computed(() => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            return navItemsFarmer
        } else {
            return navItems
        }
    })
    const navigateToSection = (sectionId) => {
        const currentRoute = router.currentRoute.value
        if (currentRoute.path === '/') {
            document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' })
        } else {
            router.push({ path: '/', hash: sectionId })
        }
    }
</script>

<template>
    <footer
        class="bg-gray-50"
        v-motion="{
          initial: {
            y: 50,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 400
            },
          }
        }"
    >
        <div class="container">
            <div class="py-8 laptop:py-16 flex flex-wrap justify-center laptop:justify-between laptop:items-end gap-5">
                <div>
                    <NuxtLink to="/">
                        <AppLogo class="mx-auto laptop:mx-0"/>
                    </NuxtLink>
                    <nav class="mt-4 laptop:mt-8">
                        <ul class="flex flex-wrap items-center justify-center gap-3 laptop:gap-8">
                            <li v-for="(navItem, navItemIndex) in menuItems" :key="navItemIndex">
                                <NuxtLink
                                    v-if="navItem?.url"
                                    :to="navItem?.url"
                                    class="p-2 text-gray-500 hover:text-gray-600 font-medium text-b3 transition"
                                >
                                    {{ navItem?.title }}
                                </NuxtLink>
                                <a
                                    v-else
                                    @click.prevent="navigateToSection(navItem?.sectionId)"
                                    class="p-2 text-gray-500 hover:text-gray-600 font-medium cursor-pointer text-b3 transition"
                                >
                                    {{ navItem?.title }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Form
                        @submit="onSubmit"
                        :validation-schema="subscriptionSchema"
                    >
                        <p class="mb-4 text-gray-900 text-center laptop:text-left">Rămâneți la curent cu noutățile</p>
                        <div class="flex flex-col laptop:flex-row items-center gap-2 laptop:gap-4">
                            <app-input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Introduceți adresa de e-mail"
                                form-group-class="mb-0"
                                v-model="formData.email"
                            />
                            <app-button
                                class="w-full laptop:w-[initial] shrink-0"
                                button-type="submit"
                                title="Abonați-vă"
                                :loading="loading"
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div
                class="py-8 flex flex-wrap gap-2 items-center justify-center laptop:justify-between border-t border-gray-200">
                <p class="text-gray-400 text-[15px]">© {{ dayjs().year() }} Atomania | All rights reserved.</p>
                <div class="flex items-center gap-4">
                    <!--<ul class="flex items-center gap-4">
                        <li>
                            <NuxtLink to="/" class="text-gray-400 hover:text-gray-900 text-[15px] transition">
                                Terms
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/" class="text-gray-400 hover:text-gray-900 text-[15px] transition">
                                Privacy Policy
                            </NuxtLink>
                        </li>
                    </ul>-->
                    <ul class="flex items-center gap-3">
                        <li>
                            <a href="https://www.linkedin.com/company/atomania/?viewAsMember=true" target="_blank"
                               class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/linkedin.svg" alt="Linkedin icon">
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/atomania.ro" target="_blank"
                               class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/facebook.svg" alt="Facebook icon">
                            </a>
                        </li>
                        <!--<li>
                            <a href="/" target="_blank" class="text-gray-400 hover:text-gray-900 transition">
                                <img width="20" src="/images/icons/tiktok.svg" alt="Tiktok icon">
                            </a>
                        </li>-->
                    </ul>
                    <a
                        href="https://devstrail.com/"
                        target="_blank"
                        class="relative flex items-center gap-3 text-gray-500 before:w-[1px] before:h-5 before:bg-gray-400"
                    >
                        Developed By
                        <NuxtImg
                            width="20"
                            src="/images/devstrail.svg"
                            alt="Devstrail icon"
                            title="DevsTrail"
                            class="w-5"
                        />
                    </a>
                </div>
            </div>
        </div>
        <!--<h2 class="text-center">Footer</h2>
        <div class="grid place-items-center">
            <h1>Welcome to Atomania</h1>
            <NuxtLink to="/login" class="">Login to continue</NuxtLink>
            <button @click="setLocale('en')" class="hello">en</button>
            <button @click="setLocale('ro')">ro</button>
            <p>{{ $t('welcome') }}</p>
        </div>-->
    </footer>
</template>