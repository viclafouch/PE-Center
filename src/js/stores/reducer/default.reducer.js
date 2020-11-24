import { original, produce } from 'immer'

import {
  SET_CURRENT_VIEW,
  SET_PRODUCTS,
  TOGGLE_NOTIFICATIONS
} from '../constants'

export default produce((draft, action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      draft.currentView = action.payload.currentView
      break
    case TOGGLE_NOTIFICATIONS:
      draft.enableNotifications = !original(draft).enableNotifications
      break
    case SET_PRODUCTS:
      draft.products = action.payload.products
      break
  }
})
