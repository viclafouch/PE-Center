import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import Offline from '@components/Offline/Offline'
import * as api from '@shared/api'
import { ANSWERS_VIEW, SETTINGS_VIEW, THREADS_VIEW } from '@shared/constants'
import { SET_PRODUCTS } from '@stores/constants'
import { DefaultContext } from '@stores/Default'
import { setBrowserStorage } from '@utils/browser'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import { PopupStyled, SwipeableViews } from './popup.styled'
import AnswersView from './Views/Answers/Answers'
import SettingsView from './Views/Settings/Settings'
import ThreadsView from './Views/Threads/Threads'

import useNetwork from '@/js/hooks/use-network'

function Popup({ initalCurrentView }) {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [state, dispatch] = useContext(DefaultContext)
  const [currentView, setCurrentView] = useState(initalCurrentView)
  const [isOnline] = useNetwork()

  useEffect(() => {
    if (!isOnline) {
      enqueueSnackbar(t('error.offline.title'), {
        variant: 'error'
      })
    }
  }, [isOnline, enqueueSnackbar, t])

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
        setBrowserStorage('local', { products })
        dispatch({
          type: SET_PRODUCTS,
          payload: {
            products
          }
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error)
          enqueueSnackbar(t('error.unknown'), {
            variant: 'error'
          })
        }
      }
    }
    if (isOnline && state.products.length === 0) {
      init()
    }
  }, [dispatch, enqueueSnackbar, t, isOnline, state.products.length])

  return (
    <PopupStyled>
      {isOnline ? (
        <>
          <Header setCurrentView={setCurrentView} />
          <main role="main">
            <SwipeableViews style={{ transform }}>
              <div
                data-swipeable
                aria-hidden={state.currentView !== ANSWERS_VIEW}
              >
                <AnswersView />
              </div>
              <div
                data-swipeable
                aria-hidden={state.currentView !== THREADS_VIEW}
              >
                <ThreadsView />
              </div>
              <div
                data-swipeable
                aria-hidden={state.currentView !== SETTINGS_VIEW}
              >
                <SettingsView />
              </div>
            </SwipeableViews>
          </main>
          <Footer currentView={currentView} setCurrentView={setCurrentView} />
        </>
      ) : (
        <Offline />
      )}
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
