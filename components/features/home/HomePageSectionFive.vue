<script setup lang="ts">
    import 'swiper/css'

    import {experts} from '~/config'
    import type {Swiper as SwiperType} from 'swiper'
    import {Swiper, SwiperSlide} from 'swiper/vue'
    import {register} from 'swiper/element/bundle'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppExpertCard from '~/components/shared/AppExpertCard.vue'

    register();

    const swiperElRef = ref<SwiperType | null>(null)
</script>

<template>
    <section class="py-10 laptop:py-[96px] overflow-hidden bg-white">
        <div class="container overflow-visible">
            <div class="mb-7 laptop:mb-14 laptop:flex justify-between gap-5">
                <app-breadcrumb
                    title="Accesați serviciile de consultanță ale experților în agricultură"
                    description="Deblocați potențialul fermei dvs. cu sfaturi personalizate de la profesioniști în domeniul agriculturei"
                />
                <div class="mt-5 laptop:mt-0 flex items-center justify-end laptop:justify-start gap-5">
                    <button
                        type="button"
                        aria-label="Înapoi"
                        class="grid size-12 laptop:size-14 place-items-center text-h6 rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        @click="() => swiperElRef?.slidePrev()"
                    >
                        <i class="dt-icon-arrow-left"/>
                    </button>
                    <button
                        type="button"
                        aria-label="Următorul"
                        class="grid size-12 laptop:size-14 place-items-center text-h6 rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        @click="() => swiperElRef?.slideNext()"
                    >
                        <i class="dt-icon-arrow-right"/>
                    </button>
                </div>
            </div>
            <Swiper
                class="!overflow-visible"
                navigation
                pagination
                :space-between="32"
                :breakpoints="{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 32,
                    },
                    768: {
                      slidesPerView: 3.4,
                      spaceBetween: 32,
                    },
                    1024: {
                      slidesPerView: 3.4,
                      spaceBetween: 32,
                    },
                }"
                @swiper="(swiper) => {
                    swiperElRef = swiper;
                }"
            >
                <SwiperSlide v-for="(expert, expertIndex) in experts">
                    <app-expert-card :expert="expert"/>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>