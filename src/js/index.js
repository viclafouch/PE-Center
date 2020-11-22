import React from 'react'
import ReactDOM from 'react-dom'
import { setBadgeText } from '@utils'

import App from './App'

import '../../i18n'
import '../scss/popup.scss'

function start() {
  setBadgeText('')
  ReactDOM.render(<App />, document.getElementById('popup'))
}

start()
