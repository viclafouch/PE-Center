import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import { sendMessageToBackground, setBrowserStorage } from '@utils/browser'

export const PopupContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme
      }

    default:
      return state
  }
}

export function PopupStore({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const DomTheme = useRef(document.documentElement.getAttribute('data-theme'))
  const { theme } = state

  useEffect(() => {
    // Skip on mount
    if (DomTheme.current !== theme) {
      DomTheme.current = theme
      document.documentElement.classList.add('color-theme-in-transition')
      document.documentElement.setAttribute('data-theme', theme)
      setBrowserStorage('sync', { theme })
      sendMessageToBackground('changeTheme', { theme })
      const handler = setTimeout(() => document.documentElement.classList.remove('color-theme-in-transition'), 1000)
      return () => clearTimeout(handler)
    }
  }, [theme])

  return <PopupContext.Provider value={[state, dispatch]}>{children}</PopupContext.Provider>
}

export const useStateValue = () => useContext(PopupContext)
