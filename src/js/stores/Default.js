import React, { createContext, useReducer } from 'react'
import { DEFAULT_START_VIEW } from '@shared/constants'

import reducer from './reducer/default.reducer'

export const store = {
  currentView: DEFAULT_START_VIEW
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
