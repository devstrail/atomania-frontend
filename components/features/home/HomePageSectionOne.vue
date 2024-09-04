<script setup lang="ts">
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
    <section class="laptop:py-[60px]">
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
                <div class="grid grid-cols-2 gap-3">
                    <div class="grid gap-3">
                        <NuxtImg
                            src="/images/banners/banner-image-1.jpg"
                            alt="Atomania Logo"
                            quality="100"
                        />
                        <NuxtImg
                            src="/images/banners/banner-image-2.jpg"
                            alt="Atomania Logo"
                            quality="100"
                        />
                    </div>
                    <div class="grid gap-3">
                        <NuxtImg
                            src="/images/banners/banner-image-3.jpg"
                            alt="Atomania Logo"
                            quality="100"
                        />
                        <NuxtImg
                            src="/images/banners/banner-image-4.jpg"
                            alt="Atomania Logo"
                            quality="100"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>