<script setup lang="ts">

    import AppBreadcrumb from "~/components/shared/AppBreadcrumb.vue";
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16"
                title="Building a digital Agriculture Community"
                subtitle="Our story"
                description="A Marketplace for Romanian farmers, by the farmers, to the farmers."
            />
            <div class="grid laptop:grid-cols-2 gap-8 laptop:gap-16">
                <p class="text-gray-500">
                    Atomania Corporation SRL (aka: Atomania.ro) is a Romanian based tech company providing a Marketplace
                    for Romanian farmers to share machines, equipment, and other technologies with skilled operators.
                    We are revolutionizing Romanian agriculture by providing a One-stop solution for farmers and
                    Agricultural businesses to be connected in One platform for all. We make the best Agricultural
                    machines sharing experience for the farmers.
                </p>
                <p class="text-gray-500">
                    Also provide expert service, IoT based weather station and Satellite imaginary analysis. It’s On-demand, fast, and easy to get. So no hassle for Agricultural machineries and technologies sharing.
                    <br><br>
                    Share, Grow, Succeed with Atomania.
                </p>
            </div>
        </div>
    </section>
</template>