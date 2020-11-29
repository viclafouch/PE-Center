import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { ANSWERS_VIEW } from '@shared/constants'
import { AnswersContext } from '@stores/Answers'
import { SET_CURRENT_VIEW, SET_SEARCH_VALUE } from '@stores/constants'
import { DefaultContext } from '@stores/Default'

import { InputBaseStyled, PaperStyled } from './header.styled'

function Header() {
  const { t } = useTranslation()
  const [answersState, answersDispatch] = useContext(AnswersContext)
  const [, defaultDispatch] = useContext(DefaultContext)

  const redirectToAnswers = () => {
    defaultDispatch({
      type: SET_CURRENT_VIEW,
      payload: {
        currentView: ANSWERS_VIEW
      }
    })
  }

  const handleChange = event => {
    const value = event.target.value
    redirectToAnswers()
    answersDispatch({
      type: SET_SEARCH_VALUE,
      payload: {
        searchValue: value
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
      <IconButton aria-label={t('menu')} onClick={redirectToAnswers}>
        <SearchIcon />
      </IconButton>
    </PaperStyled>
  )
}

Header.propTypes = {}

export default Header
