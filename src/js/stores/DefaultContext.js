import React, { createContext, useReducer, useEffect } from 'react'
import { setBrowserStorage } from '@utils/browser'
import DefaultReducer from './reducer/default'

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(DefaultReducer, { ...initialState })
  const { startPage } = state

  useEffect(() => {
    setBrowserStorage('local', { startPage })
  }, [startPage])

  return <DefaultContext.Provider value={[state, dispatch]}>{children}</DefaultContext.Provider>
}
