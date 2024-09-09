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
            <div class="mb-7 laptop:mb-14 flex justify-between gap-5">
                <app-breadcrumb
                    title="Access Expert Agricultural Guidance"
                    description="Unlock Your Farm's Potential with Tailored Advice from Seasoned Professionals"
                />
                <div class="flex items-center gap-5">
                    <button
                        type="button"
                        aria-label="Previous"
                        class="grid size-14 place-items-center text-h6 rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        @click="() => swiperElRef?.slidePrev()"
                    >
                        <i class="dt-icon-arrow-left"/>
                    </button>
                    <button
                        type="button"
                        aria-label="Next"
                        class="grid size-14 place-items-center text-h6 rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100"
                        @click="() => swiperElRef?.slideNext()"
                    >
                        <i class="dt-icon-arrow-right"/>
                    </button>
                </div>
            </div>
            <Swiper
                class="!overflow-visible"
                :slides-per-view="3.4"
                :space-between="32"
                navigation
                pagination
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