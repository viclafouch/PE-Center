import { original, produce } from 'immer'

import { SET_CURRENT_VIEW, TOGGLE_NOTIFICATIONS } from '../constants'

export default produce((draft, action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      draft.currentView = action.payload.currentView
      break
    case TOGGLE_NOTIFICATIONS:
      draft.enableNotifications = !original(draft).enableNotifications
      break
  }
})
