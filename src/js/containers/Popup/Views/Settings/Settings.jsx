import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import { DARK_THEME } from '@shared/constants'
import { handleAnchor } from '@utils/browser'

import { View } from '../views.styled'
import { MyProfil } from './settings.styled'

import { TOGGLE_THEME } from '@/js/stores/constants/index'
import { SettingsContext } from '@/js/stores/Settings'

function Settings() {
  const [settings, settingsDispatch] = useContext(SettingsContext)
  const { t } = useTranslation()

  const handleSwitchTheme = () => {
    settingsDispatch({
      type: TOGGLE_THEME
    })
  }

  return (
    <View>
      <form noValidate id="settings-form">
        <FormControl fullWidth required>
          <InputLabel id="demo-mutiple-chip-label">{t('products')}</InputLabel>
          <Select multiple></Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <FormGroup>
            <FormControlLabel
              data-switch-theme
              control={
                <Switch
                  checked={settings.theme === DARK_THEME}
                  onChange={handleSwitchTheme}
                  value="theme"
                />
              }
              label={t('darkMode')}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth required>
          <FormGroup>
            <FormControlLabel
              control={<Switch value="notifications" />}
              label={t('notifications')}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="lang">{t('language')}</InputLabel>
          <Select></Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="max-threads">{t('limitThread')}</InputLabel>
          <Select></Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="open-in">{t('openIn')}</InputLabel>
          <Select></Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="start-page">{t('launchPage')}</InputLabel>
          <Select></Select>
        </FormControl>
      </form>
      <MyProfil>
        <Typography component="p" variant="body2">
          Coded by{' '}
          <a
            href="https://twitter.com/TrustedSheriff"
            target="_blank"
            rel="noreferrer"
            onClick={handleAnchor}
          >
            Victor de la Fouchardiere
          </a>
          <br />
          <a
            href="https://github.com/viclafouch/PE-Center"
            target="_blank"
            rel="noreferrer"
            onClick={handleAnchor}
          >
            Open source project
          </a>
        </Typography>
      </MyProfil>
    </View>
  )
}

export default Settings
