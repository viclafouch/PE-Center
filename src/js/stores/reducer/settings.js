import { debug } from '@utils/utils'
import {
  SWITCH_THEME,
  SELECT_PRODUCTS,
  SWITCH_LANGUAGE,
  SET_MAX_THREADS,
  SET_OPEN_LINK_IN,
  TOGGLE_NOTIFICATIONS,
} from './constants'

const SettingsReducer = (previousState, action) => {
  debug(`TCL: SettingsReducer -> type : ${action.type}`)
  const { productsSelected, theme, lang, maxThreadsPerProduct, openLinkIn, displayNotifications, type } = action
  switch (type) {
    case SWITCH_THEME:
      debug(`TCL: SettingsReducer -> ${JSON.stringify({ theme })}`)
      return {
        ...previousState,
        theme,
      }
    case SELECT_PRODUCTS:
      debug(`TCL: SettingsReducer -> Selected ${productsSelected.length}`)
      return {
        ...previousState,
        productsSelected,
      }
    case SWITCH_LANGUAGE:
      debug(`TCL: SettingsReducer -> Selected ${lang} lang`)
      return {
        ...previousState,
        lang,
      }
    case SET_MAX_THREADS:
      debug(`TCL: SettingsReducer -> Set ${maxThreadsPerProduct} max threads per products`)
      return {
        ...previousState,
        maxThreadsPerProduct,
      }
    case SET_OPEN_LINK_IN:
      debug(`TCL: SettingsReducer -> Set openLink to ${openLinkIn}`)
      return {
        ...previousState,
        openLinkIn,
      }
    case TOGGLE_NOTIFICATIONS:
      debug(`TCL: SettingsReducer -> Set displayNotifications to ${displayNotifications}`)
      return {
        ...previousState,
        displayNotifications,
      }
    default:
      return previousState
  }
}
export default SettingsReducer
