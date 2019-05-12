import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const Block = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`

function Loader() {
  return (
    <Block>
      <CircularProgress size={20} />
    </Block>
  )
}

export default Loader
