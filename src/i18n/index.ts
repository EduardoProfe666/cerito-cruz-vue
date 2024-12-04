import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import it from './locales/it'
import de from './locales/de'
import pt from './locales/pt'

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split('-')[0] || 'es',
  fallbackLocale: 'es',
  messages: {
    en,
    es,
    fr,
    it,
    de,
    pt
  }
})