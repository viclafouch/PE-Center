import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  DARK_THEME,
  DEFAULT_LANGUAGE,
  DEFAULT_START_VIEW,
  DEFAULT_THREAD_LINK
} from '@shared/constants'
import { setBrowserStorage } from '@utils/browser'

import reducer from './reducer/settings.reducer'

export const store = {
  theme: DARK_THEME,
  lang: DEFAULT_LANGUAGE,
  startView: DEFAULT_START_VIEW,
  limitThreadsPerProduct: 10,
  openThreadLinkIn: DEFAULT_THREAD_LINK,
  productsIdSelected: []
}

export const SettingsContext = createContext()

export function SettingsProvider({ children, initialState = {} }) {
  const [state, dispatch] = useReducer(reducer, { ...store, ...initialState })
  const { i18n } = useTranslation()

  useEffect(() => {
    setBrowserStorage('sync', state)
  }, [state])

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  useEffect(() => {
    if (state.lang !== i18n.language) {
      i18n.changeLanguage(state.lang)
    }
  }, [i18n, state.lang])

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  )
}
