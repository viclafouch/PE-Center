import React, { createContext, useReducer } from 'react'
import DefaultReducer from './reducer/default'

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(DefaultReducer, { ...initialState })
  return <DefaultContext.Provider value={[state, dispatch]}>{children}</DefaultContext.Provider>
}
