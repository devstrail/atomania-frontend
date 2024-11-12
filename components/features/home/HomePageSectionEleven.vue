<script setup lang="ts">
    import 'swiper/css'
    import {testimonials} from '~/config'
    import type {Swiper as SwiperType} from 'swiper'
    import {Swiper, SwiperSlide} from 'swiper/vue'
    import {register} from 'swiper/element/bundle'

    register();

    const swiperElRef = ref<SwiperType | null>(null)
</script>

<template>
    <section class="py-8 laptop:py-[96px]">
        <div class="container">
            <Swiper
                navigation
                pagination
                :space-between="32"
                :slidesPerView="1"
                @swiper="(swiper) => {
                    swiperElRef = swiper;
                }"
            >
                <SwiperSlide v-for="(testimonial, testimonialIndex) in testimonials">
                    <div
                        class="grid laptop:grid-cols-2 gap-2 laptop:gap-16 items-center"
                    >
                        <div class="order-2 laptop:order-1 flex flex-col gap-6 laptop:gap-12">
                            <div
                                class="flex items-center gap-1"
                                v-motion="{
                                  initial: {
                                    y: 30,
                                    opacity: 0
                                  },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 400
                                    },
                                  }
                                }"
                            >
                                <template v-for="(rating, ratingIndex) in testimonial.rating">
                                    <i class="dt-icon-star-01 text-warning-300"/>
                                </template>
                            </div>
                            <h5
                                class="text-gray-900 font-medium"
                                v-motion="{
                                  initial: {
                                    y: 30,
                                    opacity: 0
                                  },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 400,
                                        delay: 500
                                    },
                                  }
                                }"
                            >
                                {{ testimonial?.quote }}
                            </h5>
                            <div
                                class="flex items-center justify-between"
                                v-motion="{
                                  initial: {
                                    y: 30,
                                    opacity: 0
                                  },
                                  visible: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 400,
                                        delay: 600
                                    },
                                  }
                                }"
                            >
                                <div class="flex items-center gap-3">
                                    <NuxtImg
                                        width="40"
                                        height="40"
                                        :src="testimonial?.client?.avatar"
                                        :alt="testimonial?.client?.name"
                                        class="size-10"
                                    />
                                    <div>
                                        <p class="text-gray-900 text-b4">
                                            {{ testimonial?.client?.name }}
                                        </p>
                                        <p class="text-gray-500 text-b5">
                                            {{ testimonial?.client?.designation }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center justify-end laptop:justify-start gap-5">
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
                        </div>
                        <div
                            class="order-1 laptop:order-2"
                            v-motion="{
                              initial: {
                                y: 30,
                                opacity: 0
                              },
                              visible: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 400
                                },
                              }
                            }"
                        >
                            <img
                                width="576"
                                height="592"
                                :src="testimonial.thumbnail"
                                :alt="testimonial?.client?.name"
                                class="rounded-lg"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>