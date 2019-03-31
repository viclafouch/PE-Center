import { debug } from '@utils/utils'
import { SET_SEARCHING, SET_CARDS } from './constants'

const DefaultReducer = (state, action) => {
  debug(`TCL: DefaultReducer -> type : ${action.type}`)
  const { isSearching, cards, type } = action
  switch (type) {
    case SET_SEARCHING:
      debug(`TCL: DefaultReducer -> ${JSON.stringify({ isSearching })}`)
      return {
        ...state,
        isSearching
      }
    case SET_CARDS:
      debug(`TCL: DefaultReducer -> set ${cards.length} card(s)`)
      return {
        ...state,
        cards
      }

    default:
      return state
  }
}

export default DefaultReducer
