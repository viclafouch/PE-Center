import React from 'react'
import ReactDOM from 'react-dom'
import { DEFAULT_LANGUAGE, DEFAULT_THEME } from '@shared/constants'
import { getBrowserStorage, setBadgeText } from '@utils/browser'

import App from './App'

import './i18n'
import '../scss/popup.scss'

async function start() {
  setBadgeText('')

  const settingsStorage = await getBrowserStorage('sync', [
    {
      key: 'theme',
      default: DEFAULT_THEME
    },
    {
      key: 'lang',
      default: DEFAULT_LANGUAGE
    }
  ])

  console.log(settingsStorage)
  ReactDOM.render(
    <App settingsInitialStore={settingsStorage} />,
    document.getElementById('popup')
  )
}

start()
