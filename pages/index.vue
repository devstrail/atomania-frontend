<script setup>
    import HomePageSectionOne from '~/components/features/home/HomePageSectionOne.vue'

    const {locale, setLocale} = useI18n()
</script>

<template>
    <home-page-section-one/>
    <div class="grid place-items-center">
        <h1>Welcome to Atomania</h1>
        <NuxtLink to="/login" class="">Login to continue</NuxtLink>
        <button @click="setLocale('en')" class="hello">en</button>
        <button @click="setLocale('ro')">ro</button>
        <p>{{ $t('welcome') }}</p>
    </div>
</template>
