import React, { useRef, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import { InputBaseStyled, PaperStyled } from './header.styled'

function Header() {
  const input = useRef()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <PaperStyled elevation={1} style={{ zIndex: 99 }}>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <InputBaseStyled
        inputRef={input}
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <IconButton style={{ padding: 6 }}>
        <SearchIcon />
      </IconButton>
    </PaperStyled>
  )
}

Header.propTypes = {}

export default Header
