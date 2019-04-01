import { useSettings } from '@/js/stores/SettingsContext'
import { SWITCH_THEME } from '@/js/stores/reducer/constants'

const useTheme = () => {
  const [{ theme }, dispatch] = useSettings()

  const setTheme = value => {
    dispatch({
      type: SWITCH_THEME,
      theme: value === true ? 'dark' : 'light'
    })
  }

  return [theme, setTheme]
}

export default useTheme
