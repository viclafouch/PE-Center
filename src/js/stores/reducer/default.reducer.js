import { original, produce } from 'immer'

import {
  ADD_THREAD_VIEWED,
  SET_PRODUCTS,
  TOGGLE_NOTIFICATIONS
} from '../constants'

export default produce((draft, action) => {
  const currentState = original(draft)
  switch (action.type) {
    case TOGGLE_NOTIFICATIONS:
      draft.enableNotifications = !currentState.enableNotifications
      break
    case SET_PRODUCTS:
      draft.products = action.payload.products
      break
    case ADD_THREAD_VIEWED:
      if (!currentState.threadsIdViewed.includes(action.payload.threadId)) {
        draft.threadsIdViewed.unshift(action.payload.threadId)
        if (draft.threadsIdViewed.length > 300) {
          draft.threadsIdViewed.length = 300
        }
      }
      break
  }
})
