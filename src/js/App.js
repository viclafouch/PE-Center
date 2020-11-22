import React from 'react'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import Popup from '@containers/Popup/Popup'

import { DefaultProvider } from './stores/Default'
import { SettingsProvider } from './stores/Settings'

function App() {
  return (
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
  )
}

export default App
