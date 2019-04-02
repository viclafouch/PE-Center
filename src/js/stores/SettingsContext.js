import React, { createContext, useReducer, useEffect, useRef, useContext } from 'react'
import { sendMessageToBackground, storageDefault, setBrowserStorage } from '@utils/browser'
import SettingsReducer from './reducer/settings'

export const SettingsContext = createContext(storageDefault.sync)

export function SettingsProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(SettingsReducer, { ...initialState })
  const { theme } = state

  useEffect(() => {
    setBrowserStorage('sync', { ...state })
  }, [state])

  const DomTheme = useRef(document.documentElement.getAttribute('data-theme'))
  useEffect(() => {
    if (DomTheme.current !== theme) {
      DomTheme.current = theme
      document.documentElement.setAttribute('data-theme', theme)
      sendMessageToBackground('changeTheme', { theme })
    }
  }, [theme])

  return <SettingsContext.Provider value={[state, dispatch]}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
