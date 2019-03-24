import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
}`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`

const Spinner = styled.div`
  width: 30px;
  margin: 0 auto;
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .circular {
    animation: ${rotate} 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke-dasharray: 2, 200;
    stroke-dashoffset: 0;
    stroke: rgba(255, 255, 255, 0.87);
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }
`

function Loader() {
  return (
    <Spinner>
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </Spinner>
  )
}

export default Loader
