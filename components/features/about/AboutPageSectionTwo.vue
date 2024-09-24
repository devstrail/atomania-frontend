<script setup lang="ts">
    import CountUp from 'vue-countup-v3'

    const isInView = ref(false)

    const observeViewport = (element: HTMLElement | null) => {
        if (!element) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    isInView.value = true;
                    observer.disconnect();
                }
            },
            {threshold: 0.1}
        );
        observer.observe(element);
    };

    onMounted(() => {
        const section = document.querySelector('#counter-section');
        observeViewport(section as HTMLElement);
    });
</script>

<template>
    <section
        v-motion="{
          initial: {
            y: 30,
            opacity: 0
          },
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 600,
              delay: 500
            },
          }
        }"
    >
        <div class="container">
            <div class="p-8 laptop:p-16 grid laptop:grid-cols-3 gap-8 justify-center rounded-2xl bg-warning-50">
                <div id="counter-section" class="text-center">
                    <h2 class="flex gap-3 items-center justify-center mb-3 text-primary-600 font-semibold">
                        Peste <count-up v-if="isInView" :end-val="200" :duration="10"/>
                    </h2>
                    <p class="text-primary-900">de fermieri s-au alăturat</p>
                </div>
                <div class="text-center">
                    <h2 class="mb-3 text-primary-600 font-semibold">
                        <count-up v-if="isInView" :end-val="8000" :duration="10"/>
                    </h2>
                    <p class="text-primary-900">ha de teren acoperit</p>
                </div>
                <div class="text-center">
                    <h2 class="flex gap-3 items-center justify-center mb-3 text-primary-600 font-semibold">
                        Peste <count-up v-if="isInView" :end-val="350" :duration="10"/>
                    </h2>
                    <p class="text-primary-900">de utilaje listate</p>
                </div>
            </div>
        </div>
    </section>
</template>
