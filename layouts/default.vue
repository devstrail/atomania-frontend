<script setup lang="ts">
    import AppCommonLayoutHeader from '~/components/layouts/common/AppCommonLayoutHeader.vue';
    import AppCommonLayoutFooter from '~/components/layouts/common/AppCommonLayoutFooter.vue';
</script>

<template>
    <div class="prose tablet:prose-tablet laptop:prose-laptop desktop:prose-desktop min-h-screen flex flex-col">
        <AppCommonLayoutHeader/>
        <slot/>
        <AppCommonLayoutFooter class="mt-auto"/>
    </div>
</template>
