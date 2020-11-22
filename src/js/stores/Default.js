import React, { createContext, useReducer } from 'react'

import reducer from './reducer/default.reducer'

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState = {} }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DefaultContext.Provider value={[state, dispatch]}>
      {children}
    </DefaultContext.Provider>
  )
}
