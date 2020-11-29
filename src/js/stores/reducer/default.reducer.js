import { original, produce } from 'immer'

import { SET_PRODUCTS, TOGGLE_NOTIFICATIONS } from '../constants'

export default produce((draft, action) => {
  const currentState = original(draft)
  switch (action.type) {
    case TOGGLE_NOTIFICATIONS:
      draft.enableNotifications = !currentState.enableNotifications
      break
    case SET_PRODUCTS:
      draft.products = action.payload.products
      break
  }
})
