import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import reducer from './reducer/answers.reducer'

const store = {
  isSearching: false,
  searchValue: '',
  page: 1,
  answers: []
}

const AnswersContext = createContext()

function AnswersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, store)

  return (
    <AnswersContext.Provider value={[state, dispatch]}>
      {children}
    </AnswersContext.Provider>
  )
}

AnswersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export { AnswersProvider, AnswersContext }
