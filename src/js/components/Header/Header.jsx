import React, { useState, useContext, useEffect, useRef } from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useDebounce } from '@shared/hooks/useDebounce'
import useSearchParams from '@shared/hooks/useSearchParams'
import { useTranslation } from 'react-i18next'
import { DefaultContext } from '@/js/stores/DefaultContext'
import { REMOVE_CARDS, CHANGE_TAB, TOGGLE_SIDEBAR, SET_SEARCHING_STATUS } from '@/js/stores/reducer/constants'

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
  const input = useRef()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [{ currentTab }, dispatch] = useContext(DefaultContext)
  const [, { setSearch }] = useSearchParams()

  const handleClickSearch = () => {
    if (currentTab !== 0) dispatch({ type: CHANGE_TAB, currentTab: 0 })
    input.current.focus()
  }

  const openSidebar = () =>
    dispatch({
      type: TOGGLE_SIDEBAR,
      isOpenSidebar: true
    })

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch({ type: CHANGE_TAB, currentTab: 0 })
      dispatch({ type: SET_SEARCHING_STATUS, isSearching: true })
    }
    setSearch(debouncedSearchTerm)
    return () => dispatch({ type: REMOVE_CARDS })
  }, [debouncedSearchTerm, dispatch, setSearch])

  return (
    <StyledPaper elevation={1} style={{ zIndex: 99 }}>
      <IconButton aria-label={t('menu')} onClick={openSidebar}>
        <MenuIcon />
      </IconButton>
      <StyledInput inputRef={input} autoFocus placeholder={t('searchHelp')} onChange={e => setSearchTerm(e.target.value)} />
      <IconButton style={{ padding: 6 }} aria-label={t('menu')} onClick={handleClickSearch}>
        <SearchIcon />
      </IconButton>
    </StyledPaper>
  )
}

export default Header
