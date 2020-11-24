import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  DARK_THEME,
  DEFAULT_ANSWER_LINK,
  DEFAULT_LANGUAGE,
  DEFAULT_START_VIEW
} from '@shared/constants'
import { setBrowserStorage } from '@utils/browser'

import reducer from './reducer/settings.reducer'

export const store = {
  theme: DARK_THEME,
  lang: DEFAULT_LANGUAGE,
  startView: DEFAULT_START_VIEW,
  limitThreadsPerProduct: 10,
  openLinkAnswerIn: DEFAULT_ANSWER_LINK
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
    i18n.changeLanguage(state.lang)
  }, [i18n, state.lang])

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  )
}
