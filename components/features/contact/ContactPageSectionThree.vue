<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppContactForm from '~/components/features/contact/AppContactForm.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16"
                title="Contactați-ne"
                subtitle="Luați legătura cu noi"
                description="Ne-ar plăcea să auzim mesajele dumneavoastră. Vă rugăm să completați acest formular"
                align="center"
            />
            <div class="max-w-[480px] mx-auto">
                <app-contact-form/>
            </div>
        </div>
    </section>
</template>