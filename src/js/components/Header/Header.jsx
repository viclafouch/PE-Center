import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { ANSWERS_VIEW } from '@shared/constants'
import { AnswersContext } from '@stores/Answers'
import { SET_SEARCH_VALUE } from '@stores/constants'
import PropTypes from 'prop-types'

import { InputBaseStyled, LogoStyled, PaperStyled } from './header.styled'

function Header({ setCurrentView }) {
  const { t } = useTranslation()
  const searchInput = useRef()
  const [answersState, answersDispatch] = useContext(AnswersContext)

  const handleChange = event => {
    const value = event.target.value
    setCurrentView(ANSWERS_VIEW)
    answersDispatch({
      type: SET_SEARCH_VALUE,
      payload: {
        searchValue: value
      }
    })
  }

  const handleGoSearch = () => {
    searchInput.current.focus()
    setCurrentView(ANSWERS_VIEW)
  }

  return (
    <PaperStyled elevation={1}>
      <LogoStyled src="/images/google-pe-program-logo.jpg" alt="PE Program" />
      <InputBaseStyled
        autoFocus
        placeholder={t('searchHelp')}
        inputProps={{
          'aria-label': 'search',
          ref: searchInput
        }}
        value={answersState.searchValue}
        onChange={handleChange}
      />
      <IconButton onClick={handleGoSearch}>
        <SearchIcon />
      </IconButton>
    </PaperStyled>
  )
}

Header.propTypes = {
  setCurrentView: PropTypes.func.isRequired
}

export default Header
