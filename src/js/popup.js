import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import Header from '@components/Header/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import MainPopupContainer from '@containers/PopupContainer'
import { SettingsProvider } from './stores/SettingsContext'
import { DefaultProvider } from './stores/DefaultContext'

function Popup() {
  const swiper = useRef(null)
  const [tab, setTab] = useState(0)

  useLayoutEffect(() => {
    const transform = `translate(-${tab * 100}%, 0px)`
    swiper.current.style.transform = transform
  }, [tab])

  return (
    <DefaultProvider
      initialState={{
        cards: [],
        searchParams: {
          value: '',
          page: 1
        }
      }}
    >
      <Header tab={tab} setTab={setTab} />
      <MainPopupContainer ref={swiper} currentTab={tab} />
      <Footer tab={tab} setTab={setTab} />
      <CssBaseline />
    </DefaultProvider>
  )
}

window.onload = async () => {
  try {
    const browserStorages = await Promise.all([getBrowserStorage('local'), getBrowserStorage('sync')])
    const storages = {
      sync: browserStorages[1] || {},
      local: browserStorages[0] || {}
    }
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
