import React, { createContext, useReducer } from 'react'

import reducer from './reducer/settings.reducer'

export const SettingsContext = createContext()

export function SettingsProvider({ children, initialState = {} }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  )
}
