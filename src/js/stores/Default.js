import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { setBrowserStorage } from '@utils/browser'

import store from './config/default'
import reducer from './reducer/default.reducer'

export const DefaultContext = createContext()

export function DefaultProvider({ children, initialState = {} }) {
  const [state, dispatch] = useReducer(reducer, { ...store, ...initialState })

  const toLocalStorage = useMemo(
    () => ({
      enableNotifications: state.enableNotifications,
      threadsUuidViewed: state.threadsUuidViewed
    }),
    [state.enableNotifications, state.threadsUuidViewed]
  )

  useEffect(() => {
    setBrowserStorage('local', toLocalStorage)
  }, [toLocalStorage])

  return (
    <DefaultContext.Provider value={[state, dispatch]}>
      {children}
    </DefaultContext.Provider>
  )
}
