import { DARK_THEME, LIGHT_THEME } from '@shared/constants'
import produce from 'immer'

import { SET_LANG, SET_START_VIEW, TOGGLE_THEME } from '../constants/index'

export default produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      draft.theme = draft.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
      break
    case SET_LANG:
      draft.lang = action.payload.lang
      break
    case SET_START_VIEW:
      draft.startView = action.payload.startView
      break
  }
})
