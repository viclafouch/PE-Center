import React, { useState, useLayoutEffect, useRef, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SearchCards from '@containers/SearchCards'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import Settings from '@containers/Settings'
import Header from '@components/Header/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import styled from 'styled-components'
import RssFeed from '@containers/RssFeed'
import { PopupStore, PopupContext } from './stores/PopupContext'

const SwipeableViews = styled.div`
  flex-direction: row;
  transition: transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  display: flex;
  will-change: transform;
  height: 100%;
  transform: translate(0%, 0px);

  & > div[data-swipeable] {
    width: 100%;
    flex-shrink: 0;
  }
`

function Popup() {
  const swiper = useRef(null)
  const [tab, setTab] = useState(0)
  const { isLoading } = useContext(PopupContext)[0]

  useEffect(() => {
    if (isLoading && tab !== 0) setTab(0)
  }, [isLoading, tab])

  useLayoutEffect(() => {
    const transform = `translate(-${tab * 100}%, 0px)`
    swiper.current.style.transform = transform
  }, [tab])

  return (
    <>
      <Header />
      <main>
        <SwipeableViews ref={swiper}>
          <div data-swipeable aria-hidden={tab !== 0}>
            <SearchCards />
          </div>
          <div data-swipeable aria-hidden={tab !== 1}>
            <RssFeed />
          </div>
          <div data-swipeable aria-hidden={tab !== 2}>
            <Settings />
          </div>
        </SwipeableViews>
      </main>
      <Footer tab={tab} setTab={setTab} />
      <CssBaseline />
    </>
  )
}

window.onload = async () => {
  try {
    const browserStorages = await Promise.all([getBrowserStorage('local'), getBrowserStorage('sync')])
    const storage = browserStorages.reduce((a, d) => Object.assign(d, a), {})
    ReactDOM.render(
      <PopupStore initialState={storage}>
        <Popup />
      </PopupStore>,
      document.getElementById('popup')
    )
  } catch (error) {
    console.warn(error)
  }
}
