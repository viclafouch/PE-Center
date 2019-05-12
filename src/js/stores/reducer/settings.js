import { debug } from '@utils/utils'
import { SWITCH_THEME, SELECT_PRODUCTS, SWITCH_LANGUAGE, SET_MAX_THREADS } from './constants'

const SettingsReducer = (previousState, action) => {
  debug(`TCL: SettingsReducer -> type : ${action.type}`)
  const { productsSelected, theme, lang, maxThreadsPerProduct, type } = action
  switch (type) {
    case SWITCH_THEME:
      debug(`TCL: SettingsReducer -> ${JSON.stringify({ theme })}`)
      return {
        ...previousState,
        theme
      }
    case SELECT_PRODUCTS:
      debug(`TCL: SettingsReducer -> Selected ${productsSelected.length}`)
      return {
        ...previousState,
        productsSelected
      }
    case SWITCH_LANGUAGE:
      debug(`TCL: SettingsReducer -> Selected ${lang} lang`)
      return {
        ...previousState,
        lang
      }
    case SET_MAX_THREADS:
      debug(`TCL: SettingsReducer -> Set ${maxThreadsPerProduct} max threads per products`)
      return {
        ...previousState,
        maxThreadsPerProduct
      }
    default:
      return previousState
  }
}
export default SettingsReducer
