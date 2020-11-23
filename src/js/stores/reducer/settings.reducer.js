import { DARK_THEME, LIGHT_THEME } from '@shared/constants'
import produce from 'immer'

import { TOGGLE_THEME } from '../constants/index'

export default produce((draft, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      draft.theme = draft.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
  }
})
