import { debug } from '@utils/utils'
import {
  SET_CARDS,
  SET_PAGE,
  REMOVE_CARDS,
  SET_SEARCH_VALUE,
  CHANGE_TAB,
  TOGGLE_SIDEBAR,
  SET_SEARCHING_STATUS,
  SWITCH_START_PAGE
} from './constants'

const DefaultReducer = (state, action) => {
  debug(`TCL: DefaultReducer -> type : ${action.type}`)
  const { cards, searchValue, page, currentTab, type, isOpenSidebar, isSearching, startPage } = action
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
        cards: [],
        searchParams: {
          ...state.searchParams,
          page: 1
        }
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
    case SET_SEARCHING_STATUS:
      debug(`TCL: DefaultReducer -> set isSearching to ${isSearching}`)
      return {
        ...state,
        isSearching
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
    case CHANGE_TAB:
      debug(`TCL: DefaultReducer -> change currentTab to ${currentTab}`)
      return {
        ...state,
        currentTab
      }
    case TOGGLE_SIDEBAR:
      debug(`TCL: DefaultReducer -> toggle sidebar to ${isOpenSidebar}`)
      return {
        ...state,
        isOpenSidebar
      }
    case SWITCH_START_PAGE:
      debug(`TCL: DefaultReducer -> toggle start page to ${startPage}`)
      return {
        ...state,
        startPage
      }

    default:
      return state
  }
}

export default DefaultReducer
