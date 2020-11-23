import React from 'react'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import Popup from '@containers/Popup/Popup'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

import { DefaultProvider } from './stores/Default'
import { SettingsProvider } from './stores/Settings'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    type: 'dark'
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultProvider
          initialState={{
            currentView: 0
          }}
        >
          <SettingsProvider>
            <Header />
            <Popup />
            <Footer />
          </SettingsProvider>
        </DefaultProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
