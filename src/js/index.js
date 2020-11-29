import React from 'react'
import ReactDOM from 'react-dom'
import { getBrowserStorage, setBadgeText } from '@utils/browser'

import App from './App'
import initI18n from './i18n'
import { store as defaultStore } from './stores/Default'
import { store as settingsStore } from './stores/Settings'

import '../scss/popup.scss'

const defaultSettingsItems = Object.keys(settingsStore).map(key => ({
  key,
  defaultValue: settingsStore[key]
}))

const defaultAppItems = [
  {
    key: 'enableNotifications',
    defaultValue: defaultStore.enableNotifications
  }
]

async function start() {
  setBadgeText('')

  const settingsStorage = await getBrowserStorage('sync', defaultSettingsItems)
  const defaultStorage = await getBrowserStorage('local', defaultAppItems)

  initI18n(settingsStorage.lang)

  ReactDOM.render(
    <App
      settingsInitialStore={settingsStorage}
      defaultInitialStore={defaultStorage}
    />,
    document.getElementById('popup')
  )
}

start()
