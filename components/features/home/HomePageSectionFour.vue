<script setup lang="ts">
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppIcon from "~/components/shared/AppIcon.vue";
    import AppList from "~/components/shared/AppList.vue";
</script>

<template>
    <section id="benefitsSection" class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-7 laptop:mb-14"
                title="Conectăm fermierii cu utilajele necesare"
                align="center"
            />
            <div class="grid laptop:grid-cols-2 gap-7 laptop:gap-[96px] items-center">
                <div
                    class="order-2 laptop:order-1"
                    v-motion="{
                      initial: {
                        y: 30,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <app-icon class="mb-6" icon="dt-icon-message-chat-circle"/>
                    <h5 class="mb-4 text-gray-900 font-semibold">
                        Beneficii pentru fermieri
                    </h5>
                    <p class="mb-2 text-gray-700 font-semibold text-b1">
                        Creșteți productivitatea fermei dvs. cu Atomania
                    </p>
                    <p class="mb-6 text-gray-500 text-b2">
                        Atomania oferă fermierilor români acces rentabil la cele mai noi utilaje agricole și asistență
                        de specialitate, ajutându-vă să obțineți recolte mai mari și operațiuni mai eficiente.
                    </p>
                    <app-list
                        :items="[
                            'Economisiți costuri: Accesați echipamente de top fără sarcina proprietății.',
                            'Măriți eficiența: Angajați operatori calificați pentru utilizarea optimă a utilajelor.',
                            'Obțineți informații: Folosiți sfatul experților și tehnologia avansată pentru a îmbunătăți managementul fermei.'
                        ]"
                    />
                </div>
                <div
                    class="order-1 laptop:order-2"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      visibleOnce: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <NuxtImg
                        widht="560"
                        height="400"
                        src="/images/features/feature-image-1.jpg"
                        alt="Farmer image"
                        class="w-full rounded-3xl"
                    />
                </div>
                <div
                    class="order-3"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      visibleOnce: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <NuxtImg
                        widht="560"
                        height="400"
                        src="/images/features/feature-image-2.jpg"
                        alt="Farmer image"
                        class="w-full rounded-3xl"
                    />
                </div>
                <div
                    class="order-4"
                    v-motion="{
                      initial: {
                        y: 30,
                        opacity: 0
                      },
                      visibleOnce: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 500,
                            delay: 500
                        },
                      }
                    }"
                >
                    <app-icon class="mb-6" icon="dt-icon-zap-fast"/>
                    <h5 class="mb-4 text-gray-900 font-semibold">
                        Beneficii pentru furnizori (furnizori de utilaje)
                    </h5>
                    <p class="mb-2 text-gray-700 font-semibold text-b1">
                        Maximizați potențialul echipamentului dvs. cu Atomania.
                    </p>
                    <p class="mb-6 text-gray-500 text-b2">
                        Atomania permite furnizorilor de utilaje să genereze venituri suplimentare prin închirierea
                        echipamentelor lor fermierilor care au nevoie de acestea, extinzându-și în același timp
                        acoperirea în România.
                    </p>
                    <app-list
                        :items="[
                            'Creșteți veniturile: Transformați utilajele inactive într-un flux constant de venituri.',
                            'Extindeți acoperirea: Conectați-vă cu o rețea mai largă de fermieri și dezvoltați-vă afacerea.',
                            'Optimizați utilizarea: Asigurați-vă că utilajele dvs. sunt utilizate la întregul său potențial.'
                        ]"
                    />
                </div>
            </div>
        </div>
    </section>
</template>