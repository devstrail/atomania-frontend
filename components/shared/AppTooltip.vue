<template>
    <Teleport to="body">
        <div
            v-if="show"
            class="custom-tooltip"
            :style="{ top: `${y}px`, left: `${x}px` }"
        >
            {{ text }}
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';

    const props = defineProps<{
        show: boolean;
        text: string;
        targetRef: HTMLElement | null;
    }>();

    const x = ref(0);
    const y = ref(0);

    const updatePosition = async () => {
        await nextTick();
        if (props.targetRef && props.targetRef instanceof HTMLElement) {
            const rect = props.targetRef.getBoundingClientRect();
            x.value = rect.left + rect.width / 2;
            y.value = rect.top - 10; // 10px above the element
        }
    };

    watch(() => props.show, async (newValue) => {
        if (newValue) {
            await updatePosition();
        }
    });

    watch(() => props.targetRef, async (newValue) => {
        if (newValue && props.show) {
            await updatePosition();
        }
    }, { immediate: true });

    onMounted(() => {
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
    });
</script>

<style scoped>
    .custom-tooltip {
        position: fixed;
        transform: translateX(-50%) translateY(-100%);
        background-color: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 9999;
    }
</style>