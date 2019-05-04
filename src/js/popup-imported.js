import React from 'react'
import ReactDOM from 'react-dom'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import Header from '@components/Header/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainPopupContainer from '@containers/PopupContainer'
import { MuiThemeProvider } from '@material-ui/core/styles'
import setTheme from '@shared/theme/theme'
import { SnackbarProvider } from 'notistack'
import { SettingsProvider, SettingsContext } from './stores/SettingsContext'
import { DefaultProvider } from './stores/DefaultContext'
import i18n from '../../i18n/i18n'

function Popup() {
  return (
    <DefaultProvider
      initialState={{
        cards: [],
        currentTab: 0,
        isOpenSidebar: false,
        isSearching: false,
        searchParams: {
          value: '',
          page: 1
        }
      }}
    >
      <SnackbarProvider maxSnack={1} dense preventDuplicate>
        <SettingsContext.Consumer>
          {([{ theme }]) => (
            <MuiThemeProvider theme={setTheme(theme)}>
              <Header />
              <MainPopupContainer />
              <Footer />
            </MuiThemeProvider>
          )}
        </SettingsContext.Consumer>
      </SnackbarProvider>
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
