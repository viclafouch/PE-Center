import React from 'react'
import List from '@material-ui/core/List'
import styled from 'styled-components'
import CardItem from './Card'

const StyledList = styled(List)`
  width: 100%;
`

function ListCards({ cards }) {
  return (
    <StyledList>
      {cards.map(card => (
        <CardItem key={card.uuid} {...card} id={card.uuid} />
      ))}
    </StyledList>
  )
}

export default ListCards
