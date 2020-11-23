import React from 'react'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import Popup from '@containers/Popup/Popup'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import muiThemes from '@shared/themes'
import { DefaultProvider } from '@stores/Default'
import {
  SettingsContext,
  SettingsProvider,
  store as settingsStore
} from '@stores/Settings'
import { ThemeProvider } from 'styled-components'

function App(props) {
  return (
    <SettingsProvider initialState={props.settingsInitialStore}>
      <DefaultProvider
        initialState={{
          currentView: 0
        }}
      >
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

App.propTypes = {
  settingsInitialStore: function (props, propName, componentName) {
    if (!Object.keys(props[propName]).every(key => key in settingsStore)) {
      console.error({
        props: props[propName],
        settingsStore: settingsStore
      })
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      )
    }
  }
}

export default App
