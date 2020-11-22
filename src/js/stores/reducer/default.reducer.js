import produce from 'immer'

import { SET_CURRENT_VIEW } from '../constants'

export default produce((draft, action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      draft.currentView = action.payload.currentView
  }
})
