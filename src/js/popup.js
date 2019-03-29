import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SearchCards from '@containers/SearchCards'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import Settings from '@containers/Settings'
import { CSSTransition } from 'react-transition-group'
import Header from '@components/Header/Header'
import CssBaseline from '@material-ui/core/CssBaseline'
import { PopupStore } from './stores/PopupContext'

function Popup({ storage }) {
  const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)
  return (
    <React.Fragment>
      <PopupStore initialState={storage}>
        <>
          <Header />
          <main>
            <SearchCards />
          </main>
          <Footer onClickSettings={() => setIsSettingsDisplayed(true)} />
          <CSSTransition in={isSettingsDisplayed} timeout={300} classNames="from-top" unmountOnExit>
            <Settings active={isSettingsDisplayed} />
          </CSSTransition>
        </>
      </PopupStore>
      <CssBaseline />
    </React.Fragment>
  )
}

window.onload = async () => {
  try {
    const browserStorages = await Promise.all([getBrowserStorage('local'), getBrowserStorage('sync')])
    const storage = browserStorages.reduce((a, d) => Object.assign(d, a), {})
    ReactDOM.render(<Popup storage={storage} />, document.getElementById('popup'))
  } catch (error) {
    console.warn(error)
  }
}
