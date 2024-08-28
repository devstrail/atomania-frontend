<script setup>
    const { locale, setLocale } = useI18n()
</script>

<template>
    <div class="grid place-items-center min-h-screen">
        <div>
            <button @click="setLocale('en')" class="hello">en</button>
            <button @click="setLocale('ro')">ro</button>
            <p>{{ $t('welcome') }}</p>
        </div>
    </div>
</template>
