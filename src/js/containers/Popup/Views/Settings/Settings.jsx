import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import { ANSWERS_VIEW, DARK_THEME, THREADS_VIEW } from '@shared/constants'
import { handleAnchor } from '@utils/browser'

import { View } from '../views.styled'
import { MyProfil } from './settings.styled'

import { languages } from '@/js/i18n'
import {
  SET_LANG,
  SET_START_VIEW,
  TOGGLE_THEME
} from '@/js/stores/constants/index'
import { SettingsContext } from '@/js/stores/Settings'

const MenuPropsMaxHeightLang = {
  PaperProps: {
    style: {
      maxHeight: 150
    }
  }
}

function Settings() {
  const [settings, settingsDispatch] = useContext(SettingsContext)

  const { t } = useTranslation()

  const handleSwitchTheme = () => {
    settingsDispatch({
      type: TOGGLE_THEME
    })
  }

  const handleChangeSettings = (type, payload) => {
    settingsDispatch({
      type,
      payload
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
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="lang">{t('language')}</InputLabel>
          <Select
            MenuProps={MenuPropsMaxHeightLang}
            value={settings.lang}
            onChange={event =>
              handleChangeSettings(SET_LANG, { lang: event.target.value })
            }
          >
            {Object.keys(languages).map(langKey => (
              <MenuItem key={langKey} value={langKey} component="li">
                {languages[langKey]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="max-threads">{t('limitThread')}</InputLabel>
          <Select></Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel htmlFor="open-in">{t('openIn')}</InputLabel>
          <Select></Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="start-page">{t('launchPage')}</InputLabel>
          <Select
            value={settings.startView}
            input={<Input id="start-page" />}
            onChange={event =>
              handleChangeSettings(SET_START_VIEW, {
                startView: event.target.value
              })
            }
            renderValue={() =>
              settings.startView === ANSWERS_VIEW
                ? t('searchHelpPage')
                : t('newPostsPage')
            }
          >
            <MenuItem key={ANSWERS_VIEW} value={ANSWERS_VIEW} component="li">
              {t('searchHelpPage')}
            </MenuItem>
            <MenuItem key={THREADS_VIEW} value={THREADS_VIEW} component="li">
              {t('newPostsPage')}
            </MenuItem>
          </Select>
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
