<script setup lang="ts">
    useHead({
        title: 'Atomania'
    })

    // Motion properties
    const initialMotion = ref({
        y: 30,
        opacity: 0
    })
    const initialMotionEnter = ref({
        y: 0,
        opacity: 1,
    })
</script>

<template>
    <section class="laptop:py-[60px] bg-gray-100">
        <div class="container">
            <div class="grid laptop:grid-cols-[641px_auto] items-center laptop:gap-[52px]">
                <div>
                    <h2
                        class="text-gray-900 font-bold"
                        v-motion="{
                          initial: initialMotion,
                          enter: {
                            ...initialMotionEnter,
                            transition: {
                                duration: 600,
                                delay: 500
                            },
                          }
                        }"
                    >
                        Connecting Romanian <span class="text-royal-flycatcher-crest-500">Farmers</span> with the <span
                        class="text-royal-flycatcher-crest-500">Machinery</span> and <span
                        class="text-royal-flycatcher-crest-500">Expertise</span> They Need, When They Need It.
                    </h2>
                </div>
                <NuxtImg
                    width="560"
                    height="640"
                    src="/images/banners/banner-image-1.png"
                    alt="Atomania Logo"
                    quality="100"
                    v-motion="{
                      initial: {
                        scale: 0.9,
                        opacity: 0
                      },
                      enter: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 500
                        },
                      }
                    }"
                />
            </div>
        </div>
    </section>
</template>