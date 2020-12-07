import { initReactI18next } from 'react-i18next'
import { FALLBACK_LANGUAGE } from '@shared/constants'
import i18n from 'i18next'

import de from '../../../locales/de.json'
import en from '../../../locales/en.json'
import es from '../../../locales/es.json'
import fr from '../../../locales/fr.json'
import id from '../../../locales/id.json'
import ja from '../../../locales/ja.json'
import pl from '../../../locales/pl.json'
import ptBR from '../../../locales/pt-BR.json'
import ru from '../../../locales/ru.json'
import tr from '../../../locales/tr.json'
import uk from '../../../locales/uk.json'

export const languages = {
  fr: 'Français', // French
  en: 'English', // English
  de: 'Deutsch', // German
  'pt-BR': 'Português (Brasil)', // Portuguese (Brasil)
  es: 'Español', // Spanish
  ru: 'Pусский‎', // Russian
  uk: 'Yкраїнська‎', // Ukrainian
  id: 'Indonesia', // Indonesia
  tr: 'Türkçe‎', // Turkish
  pl: 'Polski', // Polish
  ja: '日本語‎' // Japanese
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

const initI18n = lang =>
  i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false
    }
  })

export default initI18n
