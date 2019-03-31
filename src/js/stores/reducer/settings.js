import { SWITCH_THEME } from './constants'

const SettingsReducer = (previousState, { type, theme }) => {
  switch (type) {
    case SWITCH_THEME:
      return {
        ...previousState,
        theme
      }
    default:
      return previousState
  }
}
export default SettingsReducer
