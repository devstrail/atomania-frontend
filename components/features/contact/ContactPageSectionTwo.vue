<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <div class="grid laptop:grid-cols-2 gap-8 laptop:gap-[96px] mb-8 laptop:mb-16">
                <app-breadcrumb
                    title="Our locations"
                    description="Come visit our friendly team at one of our offices."
                />
                <div class="flex gap-6">
                    <div class="size-12 shrink-0 grid place-items-center mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-marker-pin-02 text-[24px]"/>
                    </div>
                    <div>
                        <p class="mb-2 text-gray-900 font-medium text-b1">
                            Melbourne
                        </p>
                        <p class="mb-5 text-gray-500">
                            100 Flinders Street, Melbourne VIC 3000 AU
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11728560.06297867!2d4.887535588112753!3d44.136625711242395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff26958976c3%3A0x84ef4f92a804b194!2sRomania!5e0!3m2!1sen!2sbd!4v1726162981595!5m2!1sen!2sbd"
                    width="100%"
                    height="516"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    </section>
</template>