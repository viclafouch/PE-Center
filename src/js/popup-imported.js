import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import Header from '@components/Header/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainPopupContainer from '@containers/PopupContainer'
import { MuiThemeProvider } from '@material-ui/core/styles'
import setTheme from '@shared/theme/theme'
import { SettingsProvider, SettingsContext } from './stores/SettingsContext'
import { DefaultProvider } from './stores/DefaultContext'
import i18n from '../../i18n/i18n'

function Popup() {
  const swiper = useRef(null)
  const [tab, setTab] = useState(0)

  useLayoutEffect(() => {
    const transform = `translate(-${tab * 100}%, 0px)`
    swiper.current.style.transform = transform
  }, [tab])

  return (
    <DefaultProvider
      initialState={{
        cards: [],
        searchParams: {
          value: '',
          page: 1
        }
      }}
    >
      <SettingsContext.Consumer>
        {([{ theme }]) => (
          <MuiThemeProvider theme={setTheme(theme)}>
            <Header tab={tab} setTab={setTab} />
            <MainPopupContainer ref={swiper} currentTab={tab} />
            <Footer tab={tab} setTab={setTab} />
          </MuiThemeProvider>
        )}
      </SettingsContext.Consumer>
      <CssBaseline />
    </DefaultProvider>
  )
}

export default async () => {
  try {
    const browserStorages = await Promise.all([getBrowserStorage('local'), getBrowserStorage('sync')])
    const storages = {
      sync: browserStorages[1] || {},
      local: browserStorages[0] || {}
    }

    await i18n(storages.sync.lang)

    ReactDOM.render(
      <SettingsProvider initialState={storages.sync}>
        <Popup />
      </SettingsProvider>,
      document.getElementById('popup')
    )
  } catch (error) {
    console.warn(error)
  }
}
