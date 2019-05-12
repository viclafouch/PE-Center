import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Row from '@components/Row/Row'
import styled from 'styled-components'

const HoveredCard = styled.div`
  &&:hover {
    opacity: 0.675;
    cursor: pointer;
  }
`

function Card({ card, onSelect }) {
  const getIcon = `${card.Product.name
    .toLowerCase()
    .split(' ')
    .join('-')}-64.png`

  const handleSelect = () => onSelect({ ...card, getIcon })

  return (
    <Tooltip title={card.title} enterDelay={800} leaveDelay={200} placement="left">
      <HoveredCard>
        <Row item={card} onClick={handleSelect} type="card" srcAvatar={`/images/products/${getIcon}`} />
      </HoveredCard>
    </Tooltip>
  )
}

export default Card
