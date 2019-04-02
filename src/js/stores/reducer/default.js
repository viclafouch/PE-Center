import { debug } from '@utils/utils'
import { SET_CARDS, SET_PAGE, REMOVE_CARDS, SET_SEARCH_VALUE } from './constants'

const DefaultReducer = (state, action) => {
  debug(`TCL: DefaultReducer -> type : ${action.type}`)
  const { cards, searchValue, page, type } = action
  switch (type) {
    case SET_CARDS:
      debug(`TCL: DefaultReducer -> set ${cards.length} card(s)`)
      return {
        ...state,
        cards: [...state.cards, ...cards]
      }
    case REMOVE_CARDS:
      debug(`TCL: DefaultReducer -> reset cards`)
      return {
        ...state,
        cards: []
      }
    case SET_PAGE:
      debug(`TCL: DefaultReducer -> change page to ${page}`)
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          page
        }
      }
    case SET_SEARCH_VALUE:
      debug(`TCL: DefaultReducer -> change search to ${searchValue}`)
      return {
        ...state,
        searchParams: {
          value: searchValue,
          page: 1
        }
      }

    default:
      return state
  }
}

export default DefaultReducer
