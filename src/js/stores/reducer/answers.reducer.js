import { original, produce } from 'immer'

import {
  RESET_ANSWERS,
  SET_ANSWERS,
  SET_IS_SEARCHING,
  SET_SEARCH_VALUE
} from '../constants'

export default produce((draft, action) => {
  const currentState = original(draft)
  switch (action.type) {
    case SET_IS_SEARCHING:
      draft.isSearching = action.payload.isSearching
      break
    case RESET_ANSWERS:
      draft.answers = []
      draft.page = 1
      draft.hasNextPage = true
      break
    case SET_SEARCH_VALUE:
      draft.searchValue = action.payload.searchValue
      break
    case SET_ANSWERS:
      draft.answers = [...currentState.answers, ...action.payload.answers]
      draft.page = action.payload.page
      draft.hasNextPage = action.payload.hasNextPage
      break
  }
})
