import React from 'react'
import ReactDOM from 'react-dom'
import { ANSWERS_VIEW } from '@shared/constants'
import { getBrowserStorage, setBadgeText } from '@utils/browser'

import App from './App'
import initI18n from './i18n'
import defaultStore from './stores/config/default'
import settingsStore from './stores/config/settings'

const defaultSettingsItems = Object.keys(settingsStore).map(key => ({
  key,
  defaultValue: settingsStore[key]
}))

const defaultAppItems = [
  {
    key: 'enableNotifications',
    defaultValue: defaultStore.enableNotifications
  },
  {
    key: 'products',
    defaultValue: defaultStore.products
  }
]

async function start() {
  setBadgeText('')

  const settingsStorage = await getBrowserStorage(
    'sync',
    null,
    defaultSettingsItems
  )

  settingsStorage.startView = ANSWERS_VIEW

  const defaultStorage = await getBrowserStorage('local', null, defaultAppItems)

  console.log(defaultStorage)

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
