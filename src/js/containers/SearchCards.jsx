import React, { useContext } from 'react'
import styled from 'styled-components'
import ListCards from '@components/ListCards/ListCards'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PopupContext } from '../stores/PopupContext'

const Loader = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
`

export default function SearchCards() {
  const { cards, isLoading } = useContext(PopupContext)[0]
  return (
    <div className="main-content">
      {isLoading ? (
        <Loader>
          <CircularProgress size={20} />
        </Loader>
      ) : (
        <ListCards cards={cards} />
      )}
    </div>
  )
}
