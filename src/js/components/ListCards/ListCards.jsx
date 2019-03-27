import React from 'react'
import styled from 'styled-components'
import CardItem from './Card'

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`

function ListCards({ cards }) {
  return (
    <List>
      {cards.map(card => (
        <li key={card.uuid}>
          <CardItem {...card} id={card.uuid} />
        </li>
      ))}
    </List>
  )
}

export default ListCards
