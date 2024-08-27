import en from '~/lang/en.json'
import ro from '~/lang/ro.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ro',
    messages: {
        en: en,
        ro: ro
    }
}))
