import React, { useContext, useLayoutEffect, useRef } from 'react'

import { SwipeableViews } from './popup.styled'

import { DefaultContext } from '@/js/stores/Default'

function Popup() {
  const [state] = useContext(DefaultContext)
  const swiperRef = useRef()

  useLayoutEffect(() => {
    const transform = `translate(-${state.currentView * 100}%, 0px)`
    swiperRef.current.style.transform = transform
  }, [state.currentView])

  return (
    <main>
      <SwipeableViews ref={swiperRef}>
        <div data-swipeable aria-hidden={false}>
          <div>{state.currentView}</div>
        </div>
        <div data-swipeable aria-hidden={false}>
          <div>{state.currentView}</div>
        </div>
        <div data-swipeable aria-hidden={false}>
          <div>{state.currentView}</div>
        </div>
      </SwipeableViews>
    </main>
  )
}

export default Popup
