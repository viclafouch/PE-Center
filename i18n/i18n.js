import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import ptBR from './locales/pt-BR.json'
import es from './locales/es.json'
import ru from './locales/ru.json'
import uk from './locales/uk.json'
import id from './locales/id.json'
import tr from './locales/tr.json'
import pl from './locales/pl.json'
import ja from './locales/ja.json'

export const languages = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  'pt-BR': 'Português (Brasil)',
  es: 'Español',
  ru: 'Pусский‎',
  uk: 'Yкраїнська‎',
  id: 'Indonesia',
  tr: 'Türkçe‎',
  pl: 'Polski',
  ja: '日本語‎',
}

const resources = {
  en,
  fr,
  de,
  'pt-BR': ptBR,
  es,
  ru,
  uk,
  id,
  tr,
  pl,
  ja,
}

export default (lang) =>
  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18n: false,
    },
    order: [],
    caches: [],
    htmlTag: document.documentElement,
  })
