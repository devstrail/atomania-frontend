<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-gray-50">
        <div class="container">
            <div class="grid laptop:grid-cols-2 gap-8 laptop:gap-[96px] mb-8 laptop:mb-16">
                <app-breadcrumb
                    title="Locațiile noastre"
                    description="Veniți să ne vizitați echipa prietenoasă la unul dintre birourile noastre"
                />
                <div class="flex gap-6">
                    <div
                        class="size-12 shrink-0 grid place-items-center mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-marker-pin-02 text-[24px]"/>
                    </div>
                    <div>
                        <p class="mb-2 text-gray-900 font-medium text-b1">
                            Strada Nerva Traian 27-33
                        </p>
                        <p class="mb-5 text-gray-500">
                            Sector 3, București 031044
                        </p>
                    </div>
                </div>
            </div>
            <div class="rounded-2xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.7082491950305!2d26.11243027574207!3d44.41863220259098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff1d09415555%3A0x899eed574d448e91!2sStrada%20Nerva%20Traian%2027-33%2C%20Bucure%C8%99ti%20031044%2C%20Romania!5e0!3m2!1sen!2sbd!4v1728025924507!5m2!1sen!2sbd"
                    width="100%"
                    height="516"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    </section>
</template>