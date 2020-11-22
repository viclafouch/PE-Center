import React, { createContext, useReducer } from 'react'

import reducer from './reducer/default.reducer'

const store = {
  currentView: 0,
  isSearchingAnswers: false
}

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState = {} }) {
  const [state, dispatch] = useReducer(reducer, { ...store, ...initialState })
  return (
    <DefaultContext.Provider value={[state, dispatch]}>
      {children}
    </DefaultContext.Provider>
  )
}
