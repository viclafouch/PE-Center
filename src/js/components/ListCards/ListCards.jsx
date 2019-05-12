import React, { useState } from 'react'
import List from '@material-ui/core/List'
import styled from 'styled-components'
import Card from './Card'
import SimpleDialog from './Dialog'

const StyledList = styled(List)`
  width: 100%;
`

function ListCards({ cards, enqueueSnackbar }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [cardSelected, setCardSelected] = useState({ title: '', description: '', url: '', lang: '', getIcon: '' })

  const displayDialog = card => {
    setCardSelected(card)
    setIsOpenDialog(true)
  }

  const resetDialog = () => {
    setCardSelected({ title: '', description: '', url: '', getIcon: '' })
  }

  return (
    <>
      <StyledList component="div" dense>
        {cards.map(card => (
          <Card key={`${card.Product.id}-${card.uuid}`} card={card} onSelect={displayDialog} />
        ))}
      </StyledList>
      <SimpleDialog
        enqueueSnackbar={enqueueSnackbar}
        open={isOpenDialog}
        cardSelected={cardSelected}
        afterExist={() => resetDialog()}
        close={() => setIsOpenDialog(false)}
      />
    </>
  )
}

export default ListCards
