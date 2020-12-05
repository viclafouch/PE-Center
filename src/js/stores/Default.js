import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { setBrowserStorage } from '@utils/browser'
import PropTypes from 'prop-types'

import store from './config/default'
import reducer from './reducer/default.reducer'

const DefaultContext = createContext()

function DefaultProvider({ children, initialState }) {
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

DefaultProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  initialState: PropTypes.object
}

DefaultProvider.defaultProps = {
  initialState: {}
}

export { DefaultProvider, DefaultContext }
