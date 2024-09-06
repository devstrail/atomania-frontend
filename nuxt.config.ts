export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css', '~/assets/webfonts/style.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/i18n',
        '@nuxt/image',
        '@nuxtjs/google-fonts',
        '@vueuse/motion/nuxt'
    ],
    i18n: {
        vueI18n: '~/config/i18n.config.ts'
    },
    googleFonts: {
        families: {
            Figtree: [400, 500, 600, 700],
            Inter: [400, 500, 600, 700]
        }
    },
})
