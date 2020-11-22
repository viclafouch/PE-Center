import styled from 'styled-components'

const SwipeableViews = styled.div`
  display: flex;
  flex-direction: row;
  transition: transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
  will-change: transform;
  height: 100%;
  transform: translate(0%, 0px);
  & > div[data-swipeable] {
    width: 100%;
    flex-shrink: 0;
  }
`
export { SwipeableViews }
