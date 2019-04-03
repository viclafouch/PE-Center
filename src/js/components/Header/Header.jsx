import React, { useState, useContext, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useDebounce } from '@shared/hooks/useDebounce'
import { DefaultContext } from '@/js/stores/DefaultContext'
import { REMOVE_CARDS } from '@/js/stores/reducer/constants'
import useSearchParams from '@shared/hooks/useSearchParams'
import { useTranslation } from 'react-i18next'

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

function Header(props) {
  const { t } = useTranslation()
  const { setTab } = props
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [, dispatch] = useContext(DefaultContext)
  const [, { setSearch }] = useSearchParams()

  useEffect(() => {
    if (debouncedSearchTerm) setTab(0)
    setSearch(debouncedSearchTerm)
    return () => dispatch({ type: REMOVE_CARDS })
  }, [debouncedSearchTerm, dispatch, setSearch, setTab])

  return (
    <StyledPaper elevation={1} style={{ zIndex: 99 }}>
      <IconButton aria-label={t('menu')}>
        <MenuIcon />
      </IconButton>
      <StyledInput placeholder={t('searchHelp')} onChange={e => setSearchTerm(e.target.value)} />
      <IconButton style={{ padding: 6 }} aria-label={t('menu')}>
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  )
}

export default Header
