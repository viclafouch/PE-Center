import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { AnswersContext } from '@stores/Answers'
import { SET_SEARCH_VALUE } from '@stores/constants/index'
import { SettingsContext } from '@stores/Settings'

import { InputBaseStyled, PaperStyled } from './header.styled'

function Header() {
  const { t } = useTranslation()
  const [answersState, answersDispatch] = useContext(AnswersContext)
  const [settingsState] = useContext(SettingsContext)

  const handleChange = event => {
    const value = event.target.value
    answersDispatch({
      type: SET_SEARCH_VALUE,
      payload: {
        searchValue: value,
        isSearching: settingsState.productsIdSelected.length > 0
      }
    })
  }

  return (
    <PaperStyled elevation={1}>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <InputBaseStyled
        autoFocus
        placeholder={t('searchHelp')}
        inputProps={{ 'aria-label': 'search' }}
        value={answersState.searchValue}
        onChange={handleChange}
      />
      <IconButton aria-label={t('menu')}>
        <SearchIcon />
      </IconButton>
    </PaperStyled>
  )
}

Header.propTypes = {}

export default Header
