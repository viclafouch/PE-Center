import React from 'react'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import Popup from '@containers/Popup/Popup'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import muiThemes from '@shared/themes'
import { DefaultProvider } from '@stores/Default'
import { SettingsContext, SettingsProvider } from '@stores/Settings'
import { ThemeProvider } from 'styled-components'

function App(props) {
  return (
    <SettingsProvider initialState={props.settingsInitialStore}>
      <DefaultProvider initialState={props.defaultInitialStore}>
        <SettingsContext.Consumer>
          {([settings]) => (
            <MuiThemeProvider theme={muiThemes[settings.theme]}>
              <ThemeProvider theme={muiThemes[settings.theme]}>
                <CssBaseline />
                <Header />
                <Popup />
                <Footer />
              </ThemeProvider>
            </MuiThemeProvider>
          )}
        </SettingsContext.Consumer>
      </DefaultProvider>
    </SettingsProvider>
  )
}

App.propTypes = {}

export default App
