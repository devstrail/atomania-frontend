<script setup lang="ts">
    import AppButton from '~/components/shared/AppButton.vue'
</script>

<template>
    <div class="min-h-[380px] flex gap-6 flex-col items-center justify-center text-center">
        <NuxtImg
            width="160"
            height="160"
            src="/images/empty-list.png"
            alt="Empty icon"
        />
        <div>
            <p class="mb-2 text-gray-700 font-semibold text-b2">Lista goală</p>
            <!--<p class="text-gray-500 text-b4">Nu există nicio mașină salvată în lista dvs.</p>-->
        </div>
        <!--<app-button
            title="Găsiți un utilaj"
            class="!px-20"
            :on-click-button="() => emit('switchTab', 1)"
        />-->
    </div>
</template>
