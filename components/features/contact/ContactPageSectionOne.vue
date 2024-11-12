<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-[96px]"
                title="Ne-ar plăcea să auzim mesajele dumneavoastră"
                subtitle="Contactați-ne"
                description="Echipa noastră prietenoasă este întotdeauna aici pentru a vă sprijini"
            />
            <div class="grid laptop:grid-cols-4 gap-6">
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 550
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-message-smile-circle text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Discutați prin chat cu echipa de vânzări
                    </p>
                    <p class="mb-5 text-gray-500">
                        Vorbiți cu echipa noastră prietenoasă.
                    </p>
                    <a href="mailto:sales@atomania.ro" class="text-primary-700 font-medium">
                        sales@atomania.ro
                    </a>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 600
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-message-chat-circle text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Discutați prin chat cu echipa de asistență
                    </p>
                    <p class="mb-5 text-gray-500">
                        Suntem aici să vă ajutăm
                    </p>
                    <a href="mailto:info@atomania.ro" class="text-primary-700 font-medium">
                        info@atomania.ro
                    </a>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 650
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-marker-pin-02 text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Vizitați-ne
                    </p>
                    <p class="mb-5 text-gray-500">
                        Sunteți întotdeauna bineveniți
                    </p>
                    <p class="text-primary-700 font-medium">
                        Strada Nerva Traian 27-33 <br> București 031044
                    </p>
                </div>
                <div
                    class="p-6 rounded-2xl bg-gray-50"
                    v-motion="{
                      initial: {
                        y: 20,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 700
                        },
                      }
                    }"
                >
                    <div class="size-12 grid place-items-center mb-5 laptop:mb-16 text-white rounded-[10px] bg-primary-500">
                        <i class="dt-icon-phone text-[24px]"/>
                    </div>
                    <p class="mb-2 text-gray-900 font-medium text-b1">
                        Sunați-ne
                    </p>
                    <p class="mb-5 text-gray-500">
                        Oricând, pentru orice, doar sunați
                    </p>
                    <a href="tel:+40773852475" class="text-primary-700 font-medium">
                        +40773852475
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>