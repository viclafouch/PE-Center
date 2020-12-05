import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer
} from 'react'
import { useTranslation } from 'react-i18next'
import { SEND_THEME } from '@shared/constants'
import { sendMessageToBackground, setBrowserStorage } from '@utils/browser'
import PropTypes from 'prop-types'

import store from './config/settings'
import reducer from './reducer/settings.reducer'

const SettingsContext = createContext()

function SettingsProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, { ...store, ...initialState })
  const { i18n } = useTranslation()

  useEffect(() => {
    setBrowserStorage('sync', state)
  }, [state])

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
    sendMessageToBackground(SEND_THEME, { theme: state.theme })
  }, [state.theme])

  useEffect(() => {
    if (state.lang !== i18n.language) {
      i18n.changeLanguage(state.lang)
    }
  }, [i18n, state.lang])

  return (
    <SettingsContext.Provider value={[state, dispatch]}>
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  initialState: PropTypes.object
}

SettingsProvider.defaultProps = {
  initialState: {}
}

export { SettingsProvider, SettingsContext }
