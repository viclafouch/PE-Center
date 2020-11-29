import React, { createContext, useReducer } from 'react'

import reducer from './reducer/answers.reducer'

const store = {
  isSearching: false,
  searchValue: '',
  page: 1,
  answers: []
}

export const AnswersContext = createContext()

export function AnswersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, store)

  return (
    <AnswersContext.Provider value={[state, dispatch]}>
      {children}
    </AnswersContext.Provider>
  )
}
