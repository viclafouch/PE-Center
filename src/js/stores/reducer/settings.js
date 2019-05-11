import { debug } from '@utils/utils'
import { SWITCH_THEME, SELECT_PRODUCTS, SWITCH_LANGUAGE, PUSH_THREAD_READED } from './constants'

const SettingsReducer = (previousState, action) => {
  debug(`TCL: SettingsReducer -> type : ${action.type}`)
  const { productsSelected, theme, lang, type, threadUuid } = action
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
    case PUSH_THREAD_READED:
      if (previousState.threadsUuidReaded.includes(threadUuid)) return previousState
      debug(`TCL: SettingsReducer -> Add thread ${threadUuid} to the threadsUuidReaded`)
      return {
        ...previousState,
        threadsUuidReaded: [...previousState.threadsUuidReaded, threadUuid]
      }
    default:
      return previousState
  }
}
export default SettingsReducer
