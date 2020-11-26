import React, { useContext, useEffect, useMemo } from 'react'
import * as api from '@shared/api'
import { ANSWERS_VIEW, SETTINGS_VIEW, THREADS_VIEW } from '@shared/constants'

import { SwipeableViews } from './popup.styled'
import AnswersView from './Views/Answers/Answers'
import SettingsView from './Views/Settings/Settings'
import ThreadsView from './Views/Threads/Threads'

import { SET_PRODUCTS } from '@/js/stores/constants/index'
import { DefaultContext } from '@/js/stores/Default'

function Popup() {
  const [state, dispatch] = useContext(DefaultContext)

  const transform = useMemo(() => {
    let transformPercent = 0
    if (state.currentView === THREADS_VIEW) transformPercent = 100
    else if (state.currentView === SETTINGS_VIEW) transformPercent = 200
    return `translate(-${transformPercent}%, 0px)`
  }, [state.currentView])

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
    <main>
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
  )
}

export default Popup
