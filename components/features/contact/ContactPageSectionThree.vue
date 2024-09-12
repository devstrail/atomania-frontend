<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppContactForm from '~/components/features/contact/AppContactForm.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16"
                title="Contact us"
                subtitle="Get in touch"
                description="We’d love to hear from you. Please fill out this form."
                align="center"
            />
            <div class="max-w-[480px] mx-auto">
                <app-contact-form/>
            </div>
        </div>
    </section>
</template>