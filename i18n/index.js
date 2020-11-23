import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import id from './locales/id.json'
import ja from './locales/ja.json'
import pl from './locales/pl.json'
import ptBR from './locales/pt-BR.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import uk from './locales/uk.json'

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
  ja: '日本語‎'
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
  ja
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
