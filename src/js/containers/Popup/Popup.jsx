import React, { useContext, useEffect, useMemo, useState } from 'react'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import * as api from '@shared/api'
import { ANSWERS_VIEW, SETTINGS_VIEW, THREADS_VIEW } from '@shared/constants'
import PropTypes from 'prop-types'

import { PopupStyled, SwipeableViews } from './popup.styled'
import AnswersView from './Views/Answers/Answers'
import SettingsView from './Views/Settings/Settings'
import ThreadsView from './Views/Threads/Threads'

import { SET_PRODUCTS } from '@/js/stores/constants/index'
import { DefaultContext } from '@/js/stores/Default'

function Popup({ initalCurrentView }) {
  const [state, dispatch] = useContext(DefaultContext)
  const [currentView, setCurrentView] = useState(initalCurrentView)

  const transform = useMemo(() => {
    let transformPercent = 0
    if (currentView === THREADS_VIEW) transformPercent = 100
    else if (currentView === SETTINGS_VIEW) transformPercent = 200
    return `translate(-${transformPercent}%, 0px)`
  }, [currentView])

  useEffect(() => {
    const init = async () => {
      try {
        const { products } = await api.getAllProducts()
        dispatch({
          type: SET_PRODUCTS,
          payload: {
            products
          }
        })
      } catch (error) {
        console.log(error) // TODO
      }
    }
    init()
  }, [dispatch])

  return (
    <PopupStyled>
      <Header setCurrentView={setCurrentView} />
      <main role="main">
        <SwipeableViews style={{ transform }}>
          <div data-swipeable aria-hidden={state.currentView !== ANSWERS_VIEW}>
            <AnswersView />
          </div>
          <div data-swipeable aria-hidden={state.currentView !== THREADS_VIEW}>
            <ThreadsView />
          </div>
          <div data-swipeable aria-hidden={state.currentView !== SETTINGS_VIEW}>
            <SettingsView />
          </div>
        </SwipeableViews>
      </main>
      <Footer currentView={currentView} setCurrentView={setCurrentView} />
    </PopupStyled>
  )
}

Popup.propTypes = {
  initalCurrentView: PropTypes.string
}

Popup.defaultProps = {
  initalCurrentView: ANSWERS_VIEW
}

export default Popup
