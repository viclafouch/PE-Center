import React from 'react'
import ReactDOM from 'react-dom'
import { getBrowserStorage, setBadgeText } from '@utils/browser'

import App from './App'
import { store as defaultStore } from './stores/Default'
import { store as settingsStore } from './stores/Settings'

import './i18n'
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

  defaultStorage.currentView = settingsStorage.startView

  ReactDOM.render(
    <App
      settingsInitialStore={settingsStorage}
      defaultInitialStore={defaultStorage}
    />,
    document.getElementById('popup')
  )
}

start()
