import React from 'react'
import styled from 'styled-components'
import Settings from './popup/Settings'
import SearchCards from './popup/SearchCards'
import RssFeeds from './popup/RssFeed'

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

function MainPopupContainer({ currentTab, forwardRef }) {
  return (
    <main>
      <SwipeableViews ref={forwardRef}>
        <div data-swipeable aria-hidden={currentTab !== 0}>
          <SearchCards />
        </div>
        <div data-swipeable aria-hidden={currentTab !== 1}>
          <RssFeeds />
        </div>
        <div data-swipeable aria-hidden={currentTab !== 2}>
          <Settings />
        </div>
      </SwipeableViews>
    </main>
  )
}

export default React.forwardRef(function MainForwarded(props, ref) {
  return <MainPopupContainer {...props} forwardRef={ref} />
})
