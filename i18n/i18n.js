import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

const resources = {
  en,
  fr
}

export default lang =>
  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    order: [],
    caches: [],
    htmlTag: document.documentElement
  })
