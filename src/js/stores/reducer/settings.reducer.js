import { DARK_THEME, LIGHT_THEME } from '@shared/constants'
import { original, produce } from 'immer'

import {
  SET_LANG,
  SET_LIMIT_PER_PRODUCT,
  SET_OPEN_LINK_ANSWER_IN,
  SET_PRODUCTS_ID_SELECTED,
  SET_START_VIEW,
  TOGGLE_THEME
} from '../constants'

export default produce((draft, action) => {
  const currentState = original(draft)
  switch (action.type) {
    case TOGGLE_THEME:
      draft.theme = currentState.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
      break
    case SET_LANG:
      draft.lang = action.payload.lang
      break
    case SET_START_VIEW:
      draft.startView = action.payload.startView
      break
    case SET_LIMIT_PER_PRODUCT:
      draft.limitThreadsPerProduct = action.payload.limitThreadsPerProduct
      break
    case SET_OPEN_LINK_ANSWER_IN:
      draft.openThreadLinkIn = action.payload.openThreadLinkIn
      break
    case SET_PRODUCTS_ID_SELECTED:
      draft.productsIdSelected = action.payload.productsIdSelected
      break
  }
})
