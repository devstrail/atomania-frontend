<script setup lang="ts">

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
                <div class="text-center">
                    <h2 class="mb-3 text-primary-600 font-semibold">
                        200+
                    </h2>
                    <p class="text-primary-900">Farmers joined</p>
                </div>
                <div class="text-center">
                    <h2 class="mb-3 text-primary-600 font-semibold">
                        8000
                    </h2>
                    <p class="text-primary-900">HA Land covered</p>
                </div>
                <div class="text-center">
                    <h2 class="mb-3 text-primary-600 font-semibold">
                        350+
                    </h2>
                    <p class="text-primary-900">Machines Listed</p>
                </div>
            </div>
        </div>
    </section>
</template>