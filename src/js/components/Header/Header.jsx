import React, { useState, useContext, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useDebounce } from '@shared/hooks/useDebounce'
import { PopupContext } from '@/js/stores/PopupContext'
import { searchCards } from '@shared/api/Card.api'

const StyledPaper = styled(Paper)`
  && {
    padding: 2px 4px;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0;
    background-color: var(--primary-background-color);
  }
`

const StyledInput = styled(InputBase)`
  && {
    margin-left: 8px;
    flex: 1;
  }
`

function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const dispatch = useContext(PopupContext)[1]

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch({
        type: 'setLoading',
        isLoading: true
      })
      searchCards().then(({ result }) => {
        dispatch({
          type: 'setLoading',
          isLoading: false
        })
        dispatch({
          type: 'setCards',
          cards: result
        })
      })
    } else {
      dispatch({
        type: 'setCards',
        cards: []
      })
    }
  }, [debouncedSearchTerm, dispatch])

  return (
    <StyledPaper elevation={1} style={{ zIndex: 99 }}>
      <IconButton aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <StyledInput placeholder="Rechercher une aide" onChange={e => setSearchTerm(e.target.value)} />
      <IconButton style={{ padding: 6 }} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  )
}

export default Header
